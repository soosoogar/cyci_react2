import axios from "axios";
import { useState, useRef } from "react"; // ★ useRef 추가
import { openDB } from "idb";

// 1. Base64 -> Blob 변환 유틸리티
const base64ToBlob = (base64, mimeType = 'audio/mp3') => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export default function TalkTest() {
  // TalkRequestDTO 필드에 대응하는 State
  const [text, setText] = useState("오늘 점심 메뉴 추천해줄래?"); // request.text
  const [lang, setLang] = useState("en");                       // request.lang
  const [speaker, setSpeaker] = useState("clara");              // request.speaker

  // 화면 표시용 State
  const [replyText, setReplyText] = useState(""); // response.replyText
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const audioRef = useRef(null);




  // 2. IndexedDB 초기화
  const getDb = async () => {
    return openDB('talk-cache-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('responses')) {
          db.createObjectStore('responses'); 
        }
      },
    });
  };

  // 3. 오디오 재생 함수
  const playAudio = (blob) => {
    if (audioRef.current) {
      audioRef.current.pause();       // 재생 중지
      audioRef.current.currentTime = 0; // 재생 위치 초기화 (선택)
    }

    const audioUrl = URL.createObjectURL(blob);
    const newAudio = new Audio(audioUrl);

    // ★ 3. 새로 만든 오디오를 ref에 저장 (다음에 멈추기 위해)
    audioRef.current = newAudio;

    newAudio.play();
  };

  const handleTalk = async () => {
    if (!text.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setStatus("처리 중...");
    setReplyText(""); // 이전 대화 지우기

    // 캐시 키 생성: 요청 조건(내용+언어+화자)이 같으면 결과도 같다고 가정
    const cacheKey = `${text}-${lang}-${speaker}`;

    try {
      const db = await getDb();
      
      // -------------------------------------------------------
      // A. 캐시 확인 (IndexedDB)
      // -------------------------------------------------------
      const cachedData = await db.get('responses', cacheKey);

      if (cachedData) {
        console.log("🚀 CACHE HIT! 저장된 데이터를 사용합니다.");
        setStatus("캐시 데이터 재생 중... 🎵");
        
        // 캐시에서 텍스트와 오디오를 모두 복구
        setReplyText(cachedData.replyText); 
        playAudio(cachedData.audioBlob);
        
        setIsLoading(false);
        return;
      }

      // -------------------------------------------------------
      // B. 서버 요청 (Axios) - CACHE MISS
      // -------------------------------------------------------
      console.log("🌐 서버에 요청을 보냅니다.");
      
      // TalkRequestDTO 구조와 일치
      const requestBody = {
        text: text,
        lang: lang,
        speaker: speaker
      };

      const response = await axios.post('http://localhost:8080/api/talk/test', requestBody, {
        headers: { 'Content-Type': 'application/json' }
      });

      // TalkResponseDTO 구조와 일치 (userIdx, talkResponseId는 사용 안함)
      const { 
        replyText: serverReplyText, 
        ttsData: serverTtsData 
      } = response.data;

      // 화면에 AI 답변 텍스트 표시
      setReplyText(serverReplyText);

      if (serverTtsData) {
        // 1. Base64 -> Blob 변환
        const audioBlob = base64ToBlob(serverTtsData);
        
        // 2. DB에 저장 (Value를 객체로 저장하여 텍스트+오디오 모두 보관)
        const dataToSave = {
          replyText: serverReplyText, // 나중에 캐시에서 꺼낼 때 텍스트도 보여주기 위해
          audioBlob: audioBlob
        };
        
        await db.put('responses', dataToSave, cacheKey);

        // 3. 재생
        setStatus("재생 중... 🎵");
        playAudio(audioBlob);
      } else {
        setStatus("오디오 데이터가 없습니다.");
      }

    } catch (error) {
      console.error("Error:", error);
      setStatus("에러 발생!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}>
      <h2>💬 AI Talk Client</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* 입력창 (request.text) */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="한국어로 말 걸기"
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          {/* 언어 선택 (request.lang) */}
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          >
            <option value="영어">영어 (en)</option>
            <option value="일본어">일본어 (ja)</option>
            <option value="중국어">중국어 (zh)</option>
          </select>

          {/* 화자 선택 (request.speaker) */}
          <select 
            value={speaker} 
            onChange={(e) => setSpeaker(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          >
            <option value="clara">Clara</option>
            <option value="matt">Matt</option>
            <option value="jinho">Jinho</option>
          </select>
        </div>

        <button
          onClick={handleTalk}
          disabled={isLoading}
          style={{
            padding: "12px",
            backgroundColor: isLoading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "대답 기다리는 중..." : "전송 (Send)"}
        </button>
      </div>

      {/* 결과 화면 */}
      <div style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
        <p style={{ fontSize: "12px", color: "#888" }}>Status: {status}</p>
        
        {replyText && (
          <div style={{ 
            backgroundColor: "#f1f8ff", 
            padding: "15px", 
            borderRadius: "8px",
            border: "1px solid #cce5ff" 
          }}>
            <strong style={{ display:"block", marginBottom:"5px" }}>🤖 AI Response:</strong>
            <span style={{ fontSize: "18px" }}>{replyText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
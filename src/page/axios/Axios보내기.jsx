import axios from 'axios';
import { useState } from 'react';

export default function Study() {

    const [리스트,set리스트] = useState([]);

    function test1() {
        axios.get('http://localhost:8080/test1')
        .then(res => {
            console.log(res);
        });
    }

    function test2(){
        axios.get('http://localhost:8080/data1',{params: {'text':'hello'}})
        .then(res=>{
            console.log(res);
        });
    }

    function test3(){
        axios.get('http://localhost:8080/data2',{params: {
            name: '홍길동', 
            age: 30
        }})
        .then(res=>{
            console.log(res);
        });
    }

    function test4(){
        axios.get('http://localhost:8080/data3',{params: {
            num1:10,
            num2:5
        }})
        .then(res=>{
            console.log(res);
        });
    }

    function post1(){
        axios.post('http://localhost:8080/post1',{name:'홍길동',age:20})
        .then(res=>{
            console.log(res)
        })
    }

    function res1(){
        axios.get('http://localhost:8080/res1',{params: {
            name: '전우치', 
            age: 24
        }})
        .then(res=>{
            console.log(res);
        });
    }

    function boardList(){
        axios.get('http://localhost:8080/api/board/list')
        .then(res=>{
            console.log(res);
            
            if(res.status!==200){
                console.log('error');
            }
            const list = res.data;
            console.log(list);
            set리스트(list);
        })
    }

    function 자식이부모부르는함수(){
        boardList();
    }

    return (
        <div>
            <h1>게시판 만들기</h1>
            <게시판만들기 eventHelp={자식이부모부르는함수}/>
            <h1>Axios 사용해보기</h1>
            <input type="button" value="axios보내기1"
            onClick={test1} />
            <input type="button" value="axios보내기2"
            onClick={test2} />
            <input type="button" value="axios보내기3"
            onClick={test3} />
            <input type="button" value="axios보내기4"
            onClick={test4} />
            <input type="button" value="Post보내기1"
            onClick={post1} />
            <input type="button" value="res호출"
            onClick={res1} />

            <h1>게시판 불러오기</h1>
            <input type="button" value="리스트 불러오기"
            onClick={boardList}/>
            {리스트.map(item=>(
                <div key={item.boardIdx}>
                    <span>{item.title}</span>
                    <span>{item.userId}</span>
                    <span>{item.createAt}</span>
                </div>
            ))}
        </div>
    )
}

function 게시판만들기(props){
    function 게시판만들기이벤트(){
        const title=document.getElementById('title');
        const content=document.getElementById('content');
        const userId=document.getElementById('userId');

        const obj = {title:title.value, content:content.value, userId:userId.value};
        axios.post('http://localhost:8080/api/board/register',obj)
        .then(res=>{
            /**
             * 서버하고 통신이 제대로 되었는가 확인
             * 여기서 확은, status가 200번 인지 확인
             */
            console.log(res);
            props.eventHelp();
        })
    }

    return(
        <div>
            제목: <input type='text' id="title"/><br/>
            작성자: <input type='text' id="userId"/><br/>
            내용: <textarea style={{width: '300px',height: '200px'}} id="content"/>
            <input type="button" value="게시판 등록" onClick={게시판만들기이벤트}/>
        </div>
    )
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DarkMode() {

    const [다크모드, set다크모드] = useState(false);

    const 페이지이동 = useNavigate();


    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor:다크모드 ? 'white': 'black',
            color: 다크모드 ? 'black': 'white'
        }}>
            
            <h1>Dark Mode 입니다</h1>
            <input type="button" value="다크모드 전환"
            onClick = { () => set다크모드(!다크모드) } />
            <input type="button" value="Home 이동하기" 
            onClick={() => {
                페이지이동('/');
            }}
            />
        </div>
    )
}
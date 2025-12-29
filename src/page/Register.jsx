import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const 페이지이동 = useNavigate();
    function 회원가입() {
        const id = document.getElementById('id');
        const pw = document.getElementById('pw');
        const email = document.getElementById('email');
        const obj = {userId: id.value, userPw: pw.value, userEmail:email.value}
        //axios.[method방식]([받는 서버 주소], [주는 데이터]);
        axios.post("http://localhost:8080/api/member/register", obj)
        .then(res=> {
            console.log(res);
            if(res.status !== 200 || res.data !== 'ok') {
                console.log('error');
                return ;
            }
            //페이지 이동
            페이지이동('/login');

        });
    }
    return (
        <div>
            <h1>회원가입 페이지</h1>
            ID: <input type="text" id="id"/><br/>
            PW: <input type="password" id="pw"/><br/>
            이메일 <input type="email" id="email"/><br/>
            <input type="button" value="회원가입"
                onClick={회원가입}
            />
        </div>
    )
}
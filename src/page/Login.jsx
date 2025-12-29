import axios from 'axios';

export default function Login() {
    function 로그인() {
        const userId = document.getElementById('id');
        const userPw = document.getElementById('pw');
        const obj = {userId: userId.value, userPw: userPw.value};
        console.log(obj);

        axios.post('http://localhost:8080/api/member/login', obj)
        .then(res=> {
            console.log(res);
            if(res.status !== 200) {
                console.error('error');
                return ;
            }
            const data = res.data;
            if(data === '') {
                //성공은 했으나, 아이디 패스워드 잘못 입력함
                alert('아이디와 패스워드를 확인해주세요.');
                return ;
            }

            //쿠키 저장
            //token: api가 준 허가증 저장
            //path: URL 허용 범위 ( '/' 내가 만든 project내의 전체 )
            //max-age=클라이언트 PC에 저장 될 시간 ( 86400 => 1일 )
            document.cookie = "token="+data+"; path=/; max-age=86400";

        });

    }

    function 쿠키확인() {
        const token = getCookie('token');
        console.log('토큰확인: ', token);
    }

    function getCookie(name) {
        const value = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='));
        return value ? value.split('=')[1] : null;
    }

    return (
        <div>
            <h1>로그인 페이지</h1>
            ID: <input type="text" id="id"/><br/>
            PW: <input type="password" id="pw"/><br/>
            <input type="button" value="로그인" onClick={로그인}/>

            <input type="button" value="쿠키 확인" onClick={쿠키확인} />
            <다른페이지/>
        </div>
    )
}

function 다른페이지(){
    function api호출(){
        axios.get('http://localhost:8080/api/main/test')
        .then(res=>{
            console.log(res);
        });
    }

    return(
        <div style={{width: '100vw',height: '300px',border: '3px solid red'}}>
            <h1>다른 페이지</h1>
            <input type="button" value="로그인 후 실행 버튼" onClick={api호출}/>
        </div>
    )
}
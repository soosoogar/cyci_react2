import axios from 'axios';

export default function Study() {

    function test1() {
        axios.get('http://localhost:8080/test1')
        .then(res => {
            console.log(res);
        });
    }

    return (
        <div>
            <h1>Axios 사용해보기</h1>
            <input type="button" value="axios보내기1"
            onClick={test1} />
        </div>
    )
}
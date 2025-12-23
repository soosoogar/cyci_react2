import axios from 'axios';

export default function Study() {

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

    return (
        <div>
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
        </div>
    )
}
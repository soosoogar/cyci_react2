import img1 from './image1.jfif';
import img2 from './image2.png';

import { useState } from 'react';

export default function Study() {

    const obj1 = {title: '귀여운 유령사진',
                    content: '작고 귀여운 하얀 유령',
                    img: img2,
                    goodCnt: 0
    };
    const obj2 = {title: '노란 병아리',
                    content: '귀엽고 말랑한 노란 병아리',
                    img: img1,
                    goodCnt: 0
    };

    //const lists = [obj1, obj2];
    const [lists, setList] = useState([obj1, obj2]);

    const 부모호출 = (index) =>{
        //alert('부모 호출');
        console.log(lists[index]);
        lists[index].goodCnt = lists[index].goodCnt+1;
        setList(lists);
    }

    return (
        <div>
            <h1>DIV 나누기</h1>
            <게시판 data={obj1}/>
            <게시판 data={obj2}/>
            <h3>구분선</h3>
            {lists.map((item, index) => (
                <게시판 key={index} data={item} fnGood={부모호출}
                    dataIndex={index}
                />
            ))}
        </div>
    )
}

function 게시판(props) {


    return (
        <div style={{
            display:'flex',
            border: '3px solid red'
        }}>
            <img src={props.data.img} 
            style={{
                marginRight: '20px'
                ,width: '200px'
                ,height: '200px'
                ,objectFit: 'cover'
                ,borderRadius: '50%'
                ,border: '1px solid black'
            }}
            />
            <div>
                <h1>{props.data.title}</h1>
                <span>{props.data.content}</span>
                <input type="button" value="좋아요"
                onClick={() => {props.fnGood(props.dataIndex); }}/>
                {props.data.goodCnt}
            </div>
        </div>
    )
}
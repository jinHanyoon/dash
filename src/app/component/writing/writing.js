'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from "../../api/supabb";
import Image from "next/image";
import useUserSession from '../../api/session';

export default function Writing({Writing_hidden}) {
  const router = useRouter();
  const {Username}= useUserSession()
    const [page01, setData] = useState([]);
    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');

    
  //                            close main 
  //  함수 컴포넌트 전달 해줄 때              함수 컴포넌트 전달 받을 때
        //  임의함수이름 (closeForm)                 onClick={closeForm} 
       //  props 전달해주는 컴포넌트에 함수 작성


    const submitWriting = async () => {
        try {
          const { data: error } =await supabase.from('page01').insert([{ title:titleValue, body:bodyValue, username:Username },]);
          setData([...page01]);
        // 새로운 데이터가 추가된 후에 페이지 데이터에 반영
          // 입력 필드 초기화
          setTitleValue('');
          setBodyValue('');
          Writing_hidden();
          alert("글 생성 완료")
        } 
        catch (error){
          console.log('데이터 추가 중 오류 발생',error)
        } 
      };


    return (
    <>

<div className='bg-neutral-500/50 w-full h-screen fixed z-50 top-0' >
          <div className='w-9/12 max-w-md h-full m-auto relative flex flex-col items-end'  >
      <div className='absolute top-14 right-2 w-8 h-1/10 bg-rose-400 hover:bg-rose-500 rounded-full text-center font-bold text-white leading-loose' onClick={Writing_hidden} >X</div>

          <input
            className="block  p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-12 "
            placeholder="제목"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <textarea
            className="block p-2.5 h-96 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
            placeholder="내용"
            value={bodyValue}
            onChange={(e) => setBodyValue(e.target.value)}
          />
          <div onClick={submitWriting} className='text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-3'>저장</div>
          </div>
        </div>

    </>


  );
}

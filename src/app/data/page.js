'use client'
import { useEffect, useState } from 'react';
import Image from "next/image";
import Loading from '../loading';
import supabase from '../api/page';

    // let { data: first_data } = await supabase.from('page01').select('*')

export default function Data() {
    const [page01, setData] = useState([]);

    useEffect(() => {
      async function render() {
        const { data: page01 } = await supabase.from('page01').select('*');
        setData(page01);
      }
      render();
    },
    [page01]);

    const handleDelete = async (title, body) => {
      try {
        const {error} = await supabase.from('page01').delete().eq('title', title).eq('body', body);
      } catch (error) {
        console.log(error, '삭제 중 오류 발생')
      }

      setData(page01 => page01.filter(item => item.title !== title || item.body !== body));
    };

    if (page01 === null || page01.length === 0) {
      return <Loading />;
    }else{
    }
  return (
    <>
    <div className="container px-5 py-24 mx-auto" >
        <div className="flex flex-wrap -m-4">
           
 {page01.map(page01 => (
  <div key={page01.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
          <a className="block relative h-48 rounded overflow-hidden">
            <Image alt="ecommerce"
  className="object-cover object-center w-full h-full block hover:opacity-50"
  src="/img/img04.jpg"
   width={300} height={300}/>
   <p onClick={() => handleDelete(page01.title, page01.body)} className="absolute top-2 right-2 w-1/12 h-1/6 bg-sky-300/50 rounded-full text-center font-bold text-white leading-loose">X</p>
          </a>
          <div className="mt-4">
            <h2 className="text-gray-500 text-xs tracking-widest title-font mb-1">SupaBase</h2>
            <h3 className="text-gray-900 title-font text-lg font-medium">{page01.title}</h3>
            <p  className="mt-1">{page01.body}</p>
          </div>
        </div>
))}
  




  </div>
  </div>
    </>
  );
}

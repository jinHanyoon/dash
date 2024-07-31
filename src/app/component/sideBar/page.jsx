'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {logout} from '../../login/actions'
import LoginPage from "../../login/page";
import WritingView from "../writing/page"
import useUserSession from '../../api/session';



import Image from "next/image";
export default function SideBar() {
  
    const {Username} = useUserSession()
    const {ShowLogin } = useUserSession();
    const {ShowWriting} = useUserSession();


  const [loginShow, setLoginShow] = useState (false)
    const [WritingShow, setWritingShow] = useState(false);

  const router = useRouter();



  const side_show = () => {
    setLoginShow(true)
  }

  const hidden_show = () => {
    setLoginShow(false)
  }

  const Writing_Show = () => {
    setWritingShow(true )
  }
  const Writing_hidden = () => {
    setWritingShow(false)
  }



  return (
  <>

{!ShowLogin && (
    <>
  <div onClick={side_show} className= ' fixed z-40 right-40 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>로그인</div> 

  </>
 )} 

{loginShow && (
  <LoginPage hidden_show={hidden_show}/>
)}



  {ShowLogin && (
    <>
  <div  className= ' fixed z-40 right-10 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={Writing_Show}>글쓰기</div> 
    <div onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute left-2/3 z-40 top-4 min-w-14">
      로그아웃
    </div>
  <div className= ' fixed z-40 right-40 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>{Username}</div> 

  </>
 )} 

{WritingShow &&(
 <WritingView Writing_hidden={Writing_hidden}/>
)}
  
 </>

)}
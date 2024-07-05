'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";
import About from '../about/page';
import Writing from '../component/writing'
import Loading from '../loading';
const supabaseUrl = 'https://geoateqvsqtelzushdpi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
    // let { data: first_data } = await supabase.from(page02').select('*')

export default function Data() {
    const [page01, setData] = useState([]);
    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [dataShow, ShowData] = useState(false)
return(
    <>
       <About page01={page01} />
       <Writing page01={page01} />
    </>
)
}

"use client";
import React, { use, useState } from 'react';
import Note_Input from '@/app/components/notes/NoteInput'
import Note from '@/app/components/notes/Note';
import { IoMdClose, IoMdExpand } from 'react-icons/io';
interface Props {
  params: Promise<{ id: string }>;
}

const NotePage = ({ params }: Props) => {
  const { id } = use(params); // Unwrapping the promise
  const [show, setShow] = useState(false);

  return (
    <div className='flex flex-col md:flex-row w-full justify-center h-full mr-5 md:pb-12 md:pt-0 pt-0 overflow-auto'>
      <div className='flex-1 overflow-y-scroll pt-5'>
        <Note id={id} />
      </div>
      <div
    className={`mb-5 border p-2 rounded-lg border-littleLineBelowUser  overflow-auto w-full md:w-1/2 min-h-12 ${show ? "h-12 overflow-clip" : "min-h-fit"}`}
  >  
 

  
   <button onClick={() => setShow(!show)} className="bg-proFill p-1 rounded">
          {show ? (
            
            <IoMdExpand size={24} className="text-black" />
          ):(<IoMdClose size={24} className="fill-black" />
        ) }
        </button>
      <Note_Input id={id}/>
      </div>
      </div>
  );
};

export default NotePage;


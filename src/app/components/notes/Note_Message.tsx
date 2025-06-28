import { DocumentData } from 'firebase-admin/firestore';
import Image from 'next/image';
import React from 'react';

const Note_Message = ({ notes }: { notes: DocumentData }) => {
    // Extract raw content from notes or fallback to an empty string if not available
    const contentHtml = notes?.content || "";

    return (
        <div className="py-5 text-chatText w-full mx-auto">
            <div className="flex flex-col gap-4">
                <div className='flex flex-row items gap-2 w-full text-smallText'>
                    <div className="w-10 ml-2">
                        <Image 
                            src={notes?.user?.avatar} 
                            alt="userImage" 
                            width={200} 
                            height={200} 
                            className="rounded-full w-8 h-8" 
                    />
                </div>
                    <p className='tracking-wide whitespace-nowrap'>{notes?.user?.name }</p>
                </div>
                <div className="flex items-center w-full">
                    <div className="w-full max-w-[280px] md:max-w-lg px-2 border rounded-md p-2">
                        {/* Display content as HTML using dangerouslySetInnerHTML */}
                        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Note_Message;

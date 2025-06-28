import { DocumentData } from 'firebase-admin/firestore';
import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Pick your preferred theme

const Message = ({ message }: { message: DocumentData }) => {
  const isTutor = message?.user?.name === "Tutor-AI";
  const isPragma = message?.user?.name === "Pragma";
  const isUser = !isTutor && !isPragma; // This checks for normal users
  const Name = message?.user?.name.split(" ")[0];

  return (
    <div className={`p-5 mb-2 rounded-2xl text-chatText w-full  text-sm`}>
      <div className={`flex flex-col gap-4 ${isUser ? '' : 'items-start'}`}>

        {/* If it's Tutor-AI or Pragma, show their profile and name, else hide it */}
        {(isTutor || isPragma) && (
          <div className='w-10 flex flex-row gap-2 items-center justify-center '>
            <div className='w-5 h-5 shrink-0'>
              <Image 
                src={message?.user?.avatar} 
                alt="userImage" 
                width={200} 
                height={200} 
                className='rounded-full' 
              />
            </div>
            <p className='text-sm text-nowrap whitespace-nowrap text-smallText font-bold'>{Name}</p>
          </div>
        )}

        <div className='flex items-center w-full'>
          {/* Apply responsive width for mobile */}
          <div className="w-full text-lg leading-loose ">
            {isTutor || isPragma ? (
             <ReactMarkdown
             className="prose max-w-none prose-lg leading-relaxed"
             components={{
               h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4" {...props} />,
               h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-3" {...props} />,
               h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-2" {...props} />,
               p: ({ node, ...props }) => <p className="mt-2 text-chatText" {...props} />,
               ul: ({ node, ...props }) => <ul className="list-disc pl-5 mt-2" {...props} />,
               ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mt-2" {...props} />,
               code({ node, inline, className, children, ...props }: any) {  // Add `any` here to type props correctly
                 const match = /language-(\w+)/.exec(className || '');
                 return !inline && match ? (
                   <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
                     {String(children).replace(/\n$/, '')}
                   </SyntaxHighlighter>
                 ) : (
                   <code className="bg-gray-700 text-littleLineBelowUser px-1 py-0.5 rounded text-sm" {...props}>
                     {children}
                   </code>
                 );
               }
             }}
           >
             {message?.text}
           </ReactMarkdown>
           
            ) : (
              // For normal user messages, just show the text as plain text
              <div className='flex justify-end'>
                <p className='bg-chatBackgroundColor px-4 py-2 rounded-lg'>{message?.text}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

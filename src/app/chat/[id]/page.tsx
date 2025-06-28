'use client'
import Chat from "@/app/components/Chat";
import ChatInput from "@/app/components/ChatInput";
import React, { useEffect, useState } from "react";

// ChatPage Component
interface Props {
  params: Promise<{ id: string }>;
}

const ChatPage = ({ params }: Props) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  if (!id) {
    return <p>Loading...</p>;  // Show loading until the id is fetched
  }

  return (
    <div className="flex flex-col justify-center h-full md:py-20 md:pt-0 pt-0 overflow-hidden">
      <div className="flex-1 overflow-y-scroll pt-5">
        <Chat id={id} />
      </div>
      <div className="flex flex-col md:min-h-2">
        <ChatInput id={id} />
      </div>
    </div>
  );
};

export default ChatPage;

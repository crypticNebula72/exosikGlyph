"use client";
import React, { useState } from "react";
import NewChat from "./NewChat";
import Link from "next/link";
import { IoHome, IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import Chat_Row from "./Chat_Row";
import Theme from "./Theme";
import Note_Row from "./notes/Note_Row";
import New_Note from "./notes/New_Note";
import { FaCodeBranch } from "react-icons/fa";
import { IoIosSettings, IoMdPricetags } from "react-icons/io";
import { Divide } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Start open on larger screens
  const [isChatHistoryOpen, setIsHistoryChatOpen] = useState(false);
  const [isNoteHistoryOpen, setIsNoteHistoryOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data: session } = useSession();
  const pragma = "</> Pragma";
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email as string, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  const [notes, loadingNotes] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email as string, "notes"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="z-50 h-full min-h-[100vh] fixed bg-backgroundColor">
      <div className="flex flex-col h-full min-h-full ">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-2 left-5 z-50 p-2 bg-proFill border border-littleLineBelowUser rounded-lg hover:scale-105 transition-all duration-300 ${isOpen ? "hidden": ""}`}
        >
          <IoMenu size={24} className="text-black" />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:relative flex flex-col gap-4 overflow-y-auto bg-backgroundColor  h-full min-h-full shadow-glow_box   p-5 transition-all duration-300 
          ${isOpen ? "w-56 left-0" : "w-0 left-[-100%] md:overflow-hidden"}`}
        >
             <button
              className="w-fit h-fit p-2 my-0 bg-proFill  border border-littleLineBelowUser rounded-lg hover:scale-105 transition-all duration-300"
     
          onClick={() => setIsOpen(!isOpen)}
             >
          {isOpen ? <IoClose size={24} className="fill-black" /> : ""}
        </button>
          {/* Header */}
          {isOpen && (
            <div className="flex flex-col gap-3 w-full text-center text-headerColor">
              <div className="px-5 pt-5 mt-5 font-bold md:text-xl text-lg">
                Hello! {session?.user?.name?.split(" ")[0]}
              </div>
              <div className="border-b-[1px] border-littleLineBelowUser/5 w-full"></div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Link href="/" className="p-2 border h-fit border-littleLineBelowUser bg-proFill rounded-lg hover:scale-105 transition-all duration-300">
                <IoHome className="fill-black" size={24} />
              </Link>
              {isOpen && (
                <button
                  className="flex text-headerColor items-center justify-center border-[1px] rounded-xl p-2 border-littleLineBelowUser tracking-wide whitespace-nowrap w-full shadow-sm hover:scale-105 hover:duration-300"
                  onClick={() => setIsCreateOpen(!isCreateOpen)}
                >
                  Create Ticket
                  <IoChevronDown className={`transition-transform duration-300 ${isCreateOpen ? "rotate-180" : ""}`} size={18} />
                </button>
              )}
            </div>
            {isOpen && (
              <div className={`flex flex-row gap-3 overflow-hidden transition-all duration-300 relative bg-backgroundColor ${isCreateOpen ? "max-h-40" : "max-h-0 opacity-0"}`}>
                <NewChat />
                <New_Note />
              </div>
            )}
          </div>
        <Link href={"/pragma"}>
          <button
                  className="flex flex-row text-headerColor items-center justify-between border-[1px] rounded-xl p-2 border-littleLineBelowUser tracking-wide whitespace-nowrap w-full shadow-sm hover:scale-105 hover:duration-300"
                  >
                  {pragma}
                  <FaCodeBranch size={18} />
                </button>
                  </Link>
         
          <div className="flex flex-col gap-5 mt-0">
          {loading ? (
                  <div className="flex flex-col flex-1 space-y-1 overflow-auto mt-0">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="w-[90%] self-center h-8 rounded-md shrink-0 animate-pulse bg-iconColorsFunctional" />
                    ))}
                  </div>
                ): <div className="hidden">
                  </div>}
          {!session?.user && !loading && (
            <div className="text-headerColor text-lg ">
              Please <Link href={"/signin"}>Sign In</Link> to view History.
            </div>
          )}
          {/* Chat History */}
          {session?.user && isOpen && (
            <div className="h-auto w-full text-sideBarText">
              <button
                onClick={() => setIsHistoryChatOpen(!isChatHistoryOpen)}
                className="flex flex-row text-headerColor items-center justify-between border-[1px] rounded-xl p-2 border-littleLineBelowUser tracking-wide whitespace-nowrap w-full shadow-sm hover:scale-105 hover:duration-300"
               >
                Chat History
                <IoChevronDown className={`transition-transform duration-300 ${isChatHistoryOpen ? "rotate-180" : ""}`} size={18} />
              </button>
              <div className={`transition-all duration-300 overflow-y-auto  ${isChatHistoryOpen ? "max-h-[150px] mt-2" : "max-h-0"}`}>
                {loading ? (
                  <div className="flex flex-col flex-1 space-y-2 overflow-auto">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="w-[90%] self-center h-8 rounded-md shrink-0 animate-pulse bg-iconColorsFunctional" />
                    ))}
                  </div>
                ) : chats?.docs.length ? (
                  chats?.docs?.map((chat) => <Chat_Row key={chat?.id} id={chat?.id} />)
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-sm text-muted-foreground">No Chat History</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Note History */}
          {session?.user && isOpen && (
            <div className="h-auto w-full text-sideBarText">
              <button
                onClick={() => setIsNoteHistoryOpen(!isNoteHistoryOpen)}
                className="flex flex-row text-headerColor items-center justify-between border-[1px] rounded-xl p-2 border-littleLineBelowUser tracking-wide whitespace-nowrap w-full shadow-sm hover:scale-105 hover:duration-300"
                >
                Note History
                <IoChevronDown className={`transition-transform duration-300 ${isNoteHistoryOpen ? "rotate-180" : ""}`} size={18} />
              </button>
              <div className={`transition-all duration-300 overflow-y-auto  ${isNoteHistoryOpen ? "max-h-[150px] mt-2" : "max-h-0"}`}>
                {loadingNotes ? (
                  <div className="flex flex-col flex-1 space-y-2 overflow-auto">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="w-[90%] self-center h-8 rounded-md shrink-0 animate-pulse bg-iconColorsFunctional" />
                    ))}
                  </div>
                ) : notes?.docs.length ? (
                  notes?.docs?.map((notes) => <Note_Row key={notes?.id} id={notes?.id} />)
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-sm text-muted-foreground">No Note History</p>
                  </div>
                )}
              </div>
            </div>
          )}

<Link href={"/settings"}>
          <button
                  className="flex flex-row text-headerColor items-center justify-between border-[1px] rounded-xl p-2 border-littleLineBelowUser tracking-wide whitespace-nowrap w-full shadow-sm hover:scale-105 hover:duration-300"
                  >
                  Settings
                  <IoIosSettings size={18} />
                </button>
                  </Link>

<Link href={"/pricing"}>
          <button
                  className="flex flex-row text-headerColor items-center justify-between border-[1px] rounded-xl p-2 border-littleLineBelowUser tracking-wide whitespace-nowrap w-full shadow-sm hover:scale-105 hover:duration-300"
                  >
                  Pricing
                  <IoMdPricetags size={18} />
                </button>
                  </Link>
         
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import { Song } from "@/types";
import useAuthModal from "@/hooks/useAuthModal";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { useUser } from '@/hooks/useUser'
import useUPloadModal from "@/hooks/useUploadModal";
import useOnPlay from "@/hooks/useOnPlay";

import MediaItem from "./MediaItem";
import SongItem from "./SongItem";
import PageContent from "@/app/(site)/components/PageContent";


interface LibraryProps {
   songs: Song[];
}
const Library: React.FC<LibraryProps> = ({ songs }) => {

    const authModal = useAuthModal(); 
    const uploadModal = useUPloadModal(); 

    const { user} = useUser();  
   const onPlay = useOnPlay(songs);
  const onClick = () => {
    // Open an Upload Song model
    if (!user) {
        return authModal.onOpen(); 
      }

      // TODO: Check for subscription 

      return uploadModal.onOpen(); 


     //Handel Upload Later  
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p
            className=" text-neutral-400
                         font-medium
                         text-md"
          >
            Your Library
          </p>
        </div>
        <AiOutlinePlus
          // Open an Upload Song model
          onClick={onClick}
          size={20}
          className="
          text-neutral-400 
          cursor-pointer
          hover:text-white
          transition
          
          "
        />
      </div>
      <div
        className="
        flex
        flex-col
        gap-y-2
        mt-4
        px-3
        "
      >
        {/* {songs.length ? (
          songs.map((item) => (
          <MediaItem
            key={item.id}
            onClick={() => {}}
            data={item}
          />
        ))
        ): (
          <p>No songs available for you</p>
        )} */}

        {songs.map((item) => (
           <MediaItem
           key={item.id}
           onClick={(id: string) => onPlay(id)}
           data={item}
         />
        ))}
       
       
      </div>
    </div>
  );
};

export default Library;

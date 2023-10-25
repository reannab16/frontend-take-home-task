import React, { SetStateAction } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({setSearchQuery}:{setSearchQuery:React.Dispatch<SetStateAction<string>>}) {
  /**
   * sets the search query state to the inputted search
   * @param e inputted search query
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchQuery(e.target.value)
  }
  
    return(
        <div className="relative flex items-center justify-between ">
            <input
              type="text"
              placeholder="Search"
              onChange={(e)=>handleSearchChange(e)}
              className="rounded-full h-12 border-2 border-[var(--emeraldGreen)] w-64 pl-5 placeholder:text-[var(--transGreen)] placeholder:text-base outline-2"
            />
            <SearchIcon
              className="h-6 top-3 bottom-3 absolute"
              sx={{
                position: "absolute",
                right: "1rem",
                height: "100%",
              }}
            />
          </div>
    )
}
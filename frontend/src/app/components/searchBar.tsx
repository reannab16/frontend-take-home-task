import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
    return(
        <div className="relative flex items-center justify-between ">
            <input
              type="text"
              placeholder="Search"
              className="rounded-full h-12 border-2 border-[var(--emeraldGreen)] w-64 pl-5 placeholder:text-[var(--transGreen)] placeholder:text-base"
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
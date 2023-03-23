import React, {useContext} from "react";
import { SortMethodContext } from "../../contexts/SortMethodContext";
import "./Header.css";

export default function Header() {

    const sortMethod = useContext(SortMethodContext);

    const handleClick = () => {
        if (sortMethod.options.method === "goals") {
            sortMethod.setMethod({
                method: "name",
                order: "ASC"
            });
            return;
        }
        sortMethod.setMethod({
            method: "goals",
            order: "DESC"
        });
        
    }

  return (
    <div className="content">
      <h1>NHL Game Stats</h1>
      <div>
        Sorting by: {sortMethod.options.method}, {sortMethod.options.order}
      </div>
      <button onClick={handleClick}>
        Change Sort
      </button>
    </div>
  );
}

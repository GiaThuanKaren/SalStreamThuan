import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import { InsertNewComment } from "src/services/api";
import { ICON, IconRegular, IconSolid } from "src/utils/Icon";
interface Props {
  haveMargin?: boolean;
  idPost: string;
  parentID?: string;
}

interface SessionUser extends Session {
  id: string;
}
function CommentInput({ haveMargin, idPost, parentID = "" }: Props) {
  const { data, status } = useSession();
  const DataUser: any = data?.user;
  console.log(DataUser, DataUser ? DataUser.id : " ", "USER CREDENTIAL");

  const [textComment, settextComment] = React.useState("");
  const HandleInsertComment = async function () {
    try {
      await InsertNewComment(
        parentID,
        textComment,
        idPost,
        DataUser.id as string
      );
    } catch (error) {
      throw error;
    } finally {
      settextComment("");
    }
  };

  return (
    <>
      <div className={"relative " + `${haveMargin ? "my-10" : "my-3"}`}>
        <div className="flex  items-center text-white rounded-2xl border-[1px] px-2 py-1">
          <input
            value={textComment}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                HandleInsertComment();
              }
            }}
            onChange={(e) => {
              settextComment(e.target.value);
            }}
            type="text"
            className="flex-1 outline-none border-none mr-1 bg-transparent"
          />
          <ICON icon={IconSolid.faPaperPlane} />
        </div>
        {/* <div className="absolute top-full bg-white  max-h-[300px] overflow-y-auto w-full">
          {searchResult.map((item: SearchItemModel, index: number) => {
            return <>
            <div className="w-full min-h-[50px] my-3 bg-red-300"></div>
            </>;
          })}
        </div> */}
      </div>
    </>
  );
}

export default CommentInput;

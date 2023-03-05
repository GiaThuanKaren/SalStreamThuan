import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Comment } from "src/Model";
import { GetALlComment } from "src/services/api";
import { ShowToastify } from "src/utils";
import { watchCollectionChange } from "src/utils/lib/mongodb";
import CommentInput from "../CommentInput";
interface ReplyComment {
  msg: string;
  reply: ReplyComment[];
}
const ReplyCommentComp: FC<{ dataComment: Comment }> = function ({
  dataComment,
}) {
  console.log(dataComment, "Comment");
  const [openReplyComment, setopenReplyComment] = React.useState(false);
  const [openReplyInput, setopenReplyInput] = React.useState(false);
  const [ArrCommentReply, setArrCommentReply] = React.useState<Comment[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const [idPost, SetidPost] = React.useState(id as string);

  const HandleLoadMoreComment = async function (
    parentID: string,
    Currstate: boolean
  ) {
    if (parentID && parentID.trim() != "") {
      try {
        if (Currstate) {
          setopenReplyComment(false);
        } else {
          let result = await GetALlComment(id as string, parentID);
          console.log(result, "More Comment Incomming");
          setArrCommentReply(result.data);
          setopenReplyComment(true);
        }
      } catch (error) {
        throw error;
      }
    } else {
      ShowToastify("Oops Something went wrong , please refresh the page");
    }
  };

  React.useEffect(() => {
    SetidPost(id as string);
  }, []);

  return (
    <>
      <div className="hover:cursor-pointer my-3">
        <div className="flex ">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-5 mt-1 mb-3">
            <LazyLoadImage
              className="h-full w-full object-cover"
              src={dataComment.user[0].image}
            />
          </div>
          <div>
            <p className="text-white font-medium">{dataComment?.content} </p>
            <p className="text-white text-xs font-light">
              {moment(dataComment.updatedAt).format("MMM D YY")}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <p
            onClick={() => {
              setopenReplyInput(!openReplyInput);
            }}
            className="ml-4  font-medium text-xs text-white my-1"
          >
            {openReplyInput ? "Cancel" : "Reply"}
          </p>
        </div>

        {openReplyInput && (
          <CommentInput idPost={id as string} parentID={dataComment._id} />
        )}

        {/* <p
          onClick={() => {
            setopenReplyComment(false);
            HandleLoadMoreComment(dataComment._id);
          }}
          className="font-medium text-white text-xs"
        >
          {openReplyComment ? "Hide " : "View More "}
        </p> */}
        {dataComment.replies && dataComment.replies.length > 0 && (
          <p
            onClick={() => {
              HandleLoadMoreComment(dataComment._id, openReplyComment);
            }}
            className="font-medium text-white text-xs"
          >
            {openReplyComment ? "Hide" : "View More"}
          </p>
        )}
        <div className="ml-2">
          {openReplyComment &&
            ArrCommentReply.length > 0 &&
            ArrCommentReply.map((item: Comment, index: number) => {
              console.log("Reply Comment", item);
              return (
                <>
                  <ReplyCommentComp dataComment={item} />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

function ListComment() {
  const router = useRouter();
  const { id } = router.query;
  const [ArrComment, setArrComment] = React.useState<Comment[]>([]);
  console.log("id Post comment ", id);

  async function FetchApi(parentId: string = "") {
    try {
      let result = await GetALlComment(id as string, parentId);
      console.log(result.data, "ALl Parent Comment");
      setArrComment(result.data);
    } catch (error) {
      throw error;
    }
  }
  React.useEffect(() => {
    if (id) {
      FetchApi();
    }
  }, [id]);
  return (
    <>
      <h3 className="text-white font-medium"></h3>
      <CommentInput idPost={id as string} haveMargin />
      {ArrComment.map((item: Comment, index: number) => {
        console.log(item, "Item Comment Parent");
        return (
          <>
            <ReplyCommentComp dataComment={item} />
          </>
        );
      })}
    </>
  );
}

export default ListComment;

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
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
  const { idmovie } = router.query;
  const [idPost, SetidPost] = React.useState(idmovie as string);

  const HandleLoadMoreComment = async function (parentID: string) {
    if (parentID && parentID.trim() != "") {
      try {
        let result = await GetALlComment(idmovie as string, parentID);
        console.log(result, "More Comment Incomming");
        setArrCommentReply(result.data);
        setopenReplyComment(true);
      } catch (error) {
        throw error;
      }
    } else {
      ShowToastify("Oops Something went wrong , please refresh the page");
    }
  };

  React.useEffect(() => {
    SetidPost(idmovie as string);
  }, []);

  return (
    <>
      <div className="hover:cursor-pointer my-3">
        <div className="flex ">
          <div>
            <p className="text-white font-medium">{dataComment?.content} </p>
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
          <CommentInput idPost={idmovie as string} parentID={dataComment._id} />
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
              setopenReplyComment(false);
              HandleLoadMoreComment(dataComment._id);
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
  const { idmovie } = router.query;
  const [ArrComment, setArrComment] = React.useState<Comment[]>([]);
  console.log("id Post comment ", idmovie);
  let dataCmt: ReplyComment[] = [
    {
      msg: "First Comment",
      reply: [
        {
          msg: "Reply First Comment",
          reply: [
            {
              msg: "Reply reply first comment",
              reply: [
                {
                  msg: "Reply 3th comment",
                  reply: [
                    {
                      msg: "Reply 4th comment",
                      reply: [
                        {
                          msg: "Reply 5th comment",
                          reply: [],
                        },
                        {
                          msg: "Reply 5th comment",
                          reply: [],
                        },
                        {
                          msg: "Reply 5th comment",
                          reply: [],
                        },
                        {
                          msg: "Reply 5th comment",
                          reply: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      msg: "Second Comment",
      reply: [
        {
          msg: "Reply Second Comment",
          reply: [
            {
              msg: "Reply reply comment",
              reply: [],
            },
          ],
        },
      ],
    },
  ];
  async function FetchApi(parentId: string = "") {
    try {
      let result = await GetALlComment(idmovie as string, parentId);
      console.log(result.data, "ALl Parent Comment");
      setArrComment(result.data);
    } catch (error) {
      throw error;
    }
  }
  React.useEffect(() => {
    if (idmovie) {
      FetchApi();
    }
  }, [idmovie]);
  return (
    <>
      <h3 className="text-white font-medium"></h3>
      <CommentInput idPost={idmovie as string} haveMargin />
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

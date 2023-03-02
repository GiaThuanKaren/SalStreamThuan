import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { ShowToastify } from "src/utils";
import { watchCollectionChange } from "src/utils/lib/mongodb";
import CommentInput from "../CommentInput";
interface ReplyComment {
  msg: string;
  reply: ReplyComment[];
}
const ReplyCommentComp: FC<{ dataComment: ReplyComment }> = function ({
  dataComment,
}) {
  console.log(dataComment, dataComment.reply, "Comment");
  const [openReplyComment, setopenReplyComment] = React.useState(false);
  const [openReplyInput, setopenReplyInput] = React.useState(false);
  const router = useRouter();
  const { idmovie } = router.query;
  const [idPost, SetidPost] = React.useState(idmovie as string);
  React.useEffect(() => {
    SetidPost(idmovie as string);
  }, []);
  return (
    <>
      <div className="hover:cursor-pointer my-3">
        <div className="flex ">
          <div>
            <p className="text-white font-medium">{dataComment?.msg} </p>
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

        {openReplyInput && <CommentInput idPost="" />}
        {dataComment.reply.length > 0 && (
          <p
            onClick={() => {
              setopenReplyComment(!openReplyComment);
            }}
            className="font-medium text-white text-xs"
          >
            {openReplyComment ? "Hide" : "View More"}
          </p>
        )}
        <div className="ml-2">
          {openReplyComment &&
            dataComment.reply.length > 0 &&
            dataComment.reply.map((item: ReplyComment, index: number) => {
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
  React.useEffect(() => {
    
  }, []);
  return (
    <>
      <h3 className="text-white font-medium"></h3>
      <CommentInput idPost={idmovie as string} haveMargin />
      {dataCmt.map((item: ReplyComment, index: number) => {
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

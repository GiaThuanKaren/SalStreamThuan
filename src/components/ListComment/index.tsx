import React, { FC } from "react";
import CommentInput from "../CommentInput";
interface ReplyComment {
  msg: string;
  reply: ReplyComment[];
}
const ReplyCommentComp: FC<{ dataComment: ReplyComment }> = function ({
  dataComment,
}) {
  console.log(dataComment, dataComment.reply, "Comment");
  const [openReplyComment, setopenReplyComment] = React.useState(true);
  return (
    <>
      <div className="hover:cursor-pointer">
        <p className="text-white font-medium">{dataComment?.msg} </p>
        <p className="font-medium text-white">
          {openReplyComment ? "View More" : "Hide"}
        </p>
        <div className="ml-2">
          {dataComment.reply.length > 0 &&
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
  let data: ReplyComment[] = [
    {
      msg: "Fist Comment",
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
  return (
    <>
      <CommentInput />
      {data.map((item: ReplyComment, index: number) => {
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

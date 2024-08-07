import { SmallCard, type SmallCardProps } from "@/components/small-card";
import { navigatorTo } from "@/utils/navigator";
import React, { useEffect, useState } from "react";

interface PublishListInfo extends SmallCardProps {
  id: number;
}

const Publish = (): JSX.Element => {
  const [list, setList] = useState<PublishListInfo[]>([]);

  useEffect(() => {
    setList([
      {
        id: 1,
        title: "123",
        photoUrl: "photo",
        author: "hello0",
        date: new Date(),
      },
      {
        id: 2,
        title: "456",
        photoUrl: "photo",
        author: "hello1",
        date: new Date(),
      },
      {
        id: 3,
        title: "789",
        photoUrl: "photo",
        author: "hello2",
        date: new Date(),
      },
      {
        id: 4,
        title: "123",
        photoUrl: "photo",
        author: "hello3",
        date: new Date(),
      },
      {
        id: 5,
        title: "456",
        photoUrl: "photo",
        author: "hello4",
        date: new Date(),
      },
      {
        id: 6,
        title: "789",
        photoUrl: "photo",
        author: "hello5",
        date: new Date(),
      },
      {
        id: 7,
        title: "123",
        photoUrl: "photo",
        author: "hello6",
        date: new Date(),
      },
      {
        id: 8,
        title: "456",
        photoUrl: "photo",
        author: "hello7",
        date: new Date(),
      },
      {
        id: 9,
        title: "789",
        photoUrl: "photo",
        author: "hello8",
        date: new Date(),
      },
    ]);
  }, []);

  const handleOnclick = (index: number): void => {
    navigatorTo(`pages/detail/index?id=${index}&editable=true`);
  };

  return (
    <div className="bg-[#FCFCFC] p-5 pb-[150rpx]">
      <div>This is publish.</div>
      <div>
        {list.map((item, index) => (
          <div
            key={`Publish-${index}`}
            className="mt-2"
            onClick={() => {
              handleOnclick(index);
            }}
          >
            <SmallCard
              title={item.title}
              photoUrl={item.photoUrl}
              author={item.author}
              date={item.date}
            ></SmallCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publish;

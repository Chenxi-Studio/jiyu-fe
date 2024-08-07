import { SmallCard, type SmallCardProps } from "@/components/small-card";
import React, { useEffect, useState } from "react";

const Publish = (): JSX.Element => {
  const [list, setList] = useState<SmallCardProps[]>([]);

  useEffect(() => {
    setList([
      { title: "123", photoUrl: "photo", author: "hello0", date: new Date() },
      { title: "456", photoUrl: "photo", author: "hello1", date: new Date() },
      { title: "789", photoUrl: "photo", author: "hello2", date: new Date() },
    ]);
  }, []);

  return (
    <>
      <div>This is publish.</div>
      {list.map((item, index) => (
        <SmallCard
          title={item.title}
          photoUrl={item.photoUrl}
          author={item.author}
          date={item.date}
          key={`Publish-${index}`}
        ></SmallCard>
      ))}
    </>
  );
};

export default Publish;

import { useState } from "react";
import ClipItem from "@/components/clips/ClipItem";
import clip1 from "@/assets/media/vid/clip.mp4";
import clip2 from "@/assets/media/vid/clip2.mp4";

const Clips = () => {
  document.title = "Flexiyo";

  const [isClipMuted, setIsClipMuted] = useState(true);
    const clips = [
      {
        id: "0enY6sj68KsmHe5w9mmLs",
        src: clip1,
        thumb: "https://demo.tiny.pictures/example1.jpg",
        metadata: {
          caption:
            "Different Indian Roads and highways department audishould I do if you not working for the man",
          hashtags: ["#roads", "#indianroads", "#fireman"],
          description:
            "Follow me to get more related and heart warming contents ♾️",
          audio: {
            original: false,
            external: {
              id: "Lsbr73Amb1Sjn9Slsnj",
              name: "Stay (with Justin Beiber)",
              cover:
                "https://i.scdn.co/image/ab67616d00001e0241e31d6ea1d493dd77933ee5",
              provider: {
                id: "Ejs3ksJkL26J2anSw",
                username: "justin.beiber",
              },
            },
          },
          duration: 47043,
        },
        engagement: {
          viewsCount: 965,
          likesCount: 679,
          commentsCount: 554,
          forwardsCount: 423,
        },
        creators: [
          {
            id: "Uilt7azy6jHbdy64k",
            username: "_.fire23_",
            name: "Fire Man",
            pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Pi9XytxFY0_v2aTDJ8OCybwxvOCJ3EHGmw&usqp=CAU",
          },
        ],
      },
      {
        id: "Dh42Lwb5Eh1LahsBcQ7Pm",
        src: clip2,
        thumb: "https://demo.tiny.pictures/example2.jpg",
        metadata: {
          caption: "Difference between Indian Culture and Western Culture",
          hashtags: ["#indianculture", "#westernculture", "#spiritualgyan"],
          description:
            "Know more about our Indian culture relating with the modern science and our old culture 🙏",
          audio: {
            original: true,
            external: null,
          },
          duration: 5613,
        },
        engagement: {
          viewsCount: 789,
          likesCount: 531,
          commentsCount: 234,
          forwardsCount: 478,
        },
        creators: [
          {
            id: "Kal9Ek52L3whrb2Sn",
            username: "thebohosapiens",
            name: "The Boho Sapiens",
            pfp: "https://i.pravatar.cc/300",
          },
        ],
      },
      {
        id: "48G3w0t1b7bLsBz1F3Ls",
        src: clip1,
        thumb: "https://demo.tiny.pictures/example1.jpg",
        metadata: {
          caption:
            "Different Indian Roads and highways department audishould I do if you not working for the man",
          hashtags: ["#roads", "#indianroads", "#fireman"],
          description:
            "Follow me to get more related and heart warming contents ♾️",
          audio: {
            original: false,
            external: {
              id: "Lsbr73Amb1Sjn9Slsnj",
              name: "Stay (with Justin Beiber)",
              cover:
                "https://i.scdn.co/image/ab67616d00001e0241e31d6ea1d493dd77933ee5",
              provider: {
                id: "Ejs3ksJkL26J2anSw",
                username: "justin.beiber",
              },
            },
          },
          duration: 47043,
        },
        engagement: {
          viewsCount: 965,
          likesCount: 679,
          commentsCount: 554,
          forwardsCount: 423,
        },
        creators: [
          {
            id: "Uilt7azy6jHbdy64k",
            username: "_.fire23_",
            name: "Fire Man",
            pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Pi9XytxFY0_v2aTDJ8OCybwxvOCJ3EHGmw&usqp=CAU",
          },
        ],
      },
    ]

  const renderClips = () => {
    return clips.map((clip) => (
      <ClipItem
        key={clip.id}
        clip={clip}
        isClipMuted={isClipMuted}
        setIsClipMuted={setIsClipMuted}
      />
    ));
  };
  return (
    <section id="clips" className="clips">
      <div className="clips-container">
        <div className="render-clips">{renderClips()}</div>
      </div>
    </section>
  );
};

export default Clips;

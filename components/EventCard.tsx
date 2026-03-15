import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  const imgSrc = image || "/images/thumbnail.png";
  return (
    <Link
      href={`/events/${slug}`}
      className="block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <Image
        src={imgSrc}
        alt={title}
        width={400}
        height={200}
        className="rounded-lg"
      />
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p>{location} </p>
      </div>
      <p className="text-lg font-semibold mt-2"> {title} </p>
      <div className="flex flex-row gap-2">
        <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
        <p>{date} </p>
      </div>
      <div className="flex flex-row gap-2">
        <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
        <p>{time} </p>
      </div>
    </Link>
  );
};

export default EventCard;

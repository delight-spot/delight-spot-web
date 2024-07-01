import Image from 'next/image';

interface Props {
  fileUrls?: string[];
}

export default function UploadPhotoList({ fileUrls = [] }: Props) {
  const totalSlots = 5;

  console.log(fileUrls);

  return (
    <ul className="grid grid-cols-3 gap-4 max-w-sm">
      {Array.from({ length: totalSlots }, (_, index) => (
        <li key={index} className="w-full aspect-square relative rounded-lg overflow-hidden">
          {fileUrls[index] ? (
            <Image fill src={fileUrls[index]} alt="Upload Image" className="object-cover" />
          ) : (
            <div className="absolute w-full h-full bg-slate-S200" />
          )}
        </li>
      ))}
    </ul>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  image: string;
  href: string;
  inStock?: boolean;
}

export default function ProductCard({ name, image, href, inStock = true }: ProductCardProps) {
  return (
    <Link href={href} className="flex flex-col rounded-xl overflow-hidden bg-[#F6F6F6] shadow-sm hover:shadow-md transition-shadow max-w-[280px] mx-auto w-full relative">
      {!inStock && (
        <span className="absolute top-3 right-3 z-10 bg-red-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
          Out of Stock
        </span>
      )}
      <div className={`flex-1 flex justify-center items-center p-6 aspect-square relative ${!inStock ? "opacity-50" : ""}`}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="bg-[#EBEBEB] py-5 text-center">
        <h3 className="font-bold text-[#1A1A1A] text-lg">{name}</h3>
      </div>
    </Link>
  );
}

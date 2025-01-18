"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogCardProps {
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  featureImage: string;
}

export function BlogCard({
  title,
  content,
  authorName,
  authorAvatar,
  featureImage,
}: BlogCardProps) {
  return (
    <Card className="w-[500px] overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={featureImage || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-all hover:scale-105"
        />
      </div>
      <CardHeader>
        <h3 className="text-2xl font-bold line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 h-12 overflow-hidden">
          {content}
        </p>
      </CardContent>
      <CardFooter className="flex items-center space-x-4 py-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={authorAvatar}
            alt={authorName}
            className="object-cover"
          />
          <AvatarFallback>
            {authorName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-md font-semibold">{authorName}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

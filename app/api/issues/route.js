import mongoose, {mongo} from "mongoose";
import {Issue} from "@/model/Issue";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URI);

  const {searchParams} = new URL(req.url);
  const _id = searchParams.get('_id');
  let data;
  if (_id?.length > 0) {
    data = await Issue.findOne({_id});
  } else {
    data = await Issue.find();
  }
  return Response.json(data);
}

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URI);
  const data = await req.json();

  const res = await Issue.create(data);

  return Response.json(res);

}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URI);
  const {_id, ...data} = await req.json();

  const res = await Issue.findByIdAndUpdate(_id, data);

  return Response.json(res);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URI);
  const {searchParams} = new URL(req.url);
  const _id = searchParams.get('_id');

  const res = await Issue.deleteOne({_id});

  return Response.json(res);
}


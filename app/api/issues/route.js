import mongoose, {mongo} from "mongoose";
import {Issue} from "@/model/Issue";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URI);
  const data = await Issue.find();

  return Response.json(data);
}

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URI);
  const data = req.json();

  const res = await Issue.create(data);

  return Response.json(res);

}


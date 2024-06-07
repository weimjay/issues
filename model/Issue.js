import {model, models, Schema} from "mongoose";

const IssueSchema = new Schema({
  title: {type: String},
  description: {type: String},
}, {timestamps: true});

export const Issue = models?.Issue || model('Issue', IssueSchema);
import paris from "../paris.json";
import berlin from "../berlin.json";
import madrid from "../madrid.json";
import osaka from "../osaka.json";
import denver from "../denver.json";
import tokyo from "../tokyo.json";
import rome from "../rome.json";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const slug = params.slug;

  const homeObj = {
    paris,
    berlin,
    madrid,
    osaka,
    denver,
    tokyo,
    rome,
  };

  return NextResponse.json(homeObj[slug]);
}

import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  const foundTicket = await Ticket.findOne({ _id: id });
  return NextResponse.json({ foundTicket }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const body = await req.json();
    const ticketData = body.formData;

    // Ensure that status and other fields are updated
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { ...ticketData },
      { new: true } // Return the updated document
    );

    // return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
    return NextResponse.json({ message: "Ticket updated", ticket: updatedTicket }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

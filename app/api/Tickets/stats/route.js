import Ticket from "@/app/models/Ticket"; 
import { NextResponse } from "next/server";

// Define GET handler for stats
export async function GET() {
  try {

    const totalTickets = await Ticket.countDocuments();

    const solvedTickets = await Ticket.countDocuments({ status: "done" });

    const activeTickets = await Ticket.countDocuments({ status: { $ne: "done" } });

    const solvedPercentage = totalTickets > 0 ? ((solvedTickets / totalTickets) * 100).toFixed(2) : 0;

    const categories = ["Hardware Problem", "Software Problem", "Application Development", "Project"];
    const categoryCounts = {};

    for (const category of categories) {
      categoryCounts[category] = await Ticket.countDocuments({ category });
    }


    const recentTickets = await Ticket.find().sort({ createdAt: -1 }).limit(5);

    return NextResponse.json(
      {
        totalTickets,
        solvedTickets,
        activeTickets,
        solvedPercentage,
        categoryCounts,
        recentTickets,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ message: "Error fetching stats", error: error.message }, { status: 500 });
  }
}

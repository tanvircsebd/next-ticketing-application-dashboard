import Ticket from "@/app/models/Ticket";  // Adjust the import path as necessary
import { NextResponse } from "next/server";

// Define GET handler for stats
export async function GET() {
  try {
    // Get the total number of tickets
    const totalTickets = await Ticket.countDocuments();

    // Get the number of solved (done) tickets
    const solvedTickets = await Ticket.countDocuments({ status: "done" });

    // Get the number of active tickets (not solved)
    const activeTickets = await Ticket.countDocuments({ status: { $ne: "done" } });

    // Calculate the percentage of solved tickets
    const solvedPercentage = totalTickets > 0 ? ((solvedTickets / totalTickets) * 100).toFixed(2) : 0;

    // Get the ticket count by category
    const categories = ["Hardware Problem", "Software Problem", "Application Development", "Project"];
    const categoryCounts = {};

    for (const category of categories) {
      categoryCounts[category] = await Ticket.countDocuments({ category });
    }

    // Get recent tickets (optional)
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




// import Ticket from "@/app/models/Ticket";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const categories = ["Hardware Problem", "Software Problem", "Application Development", "Project"];
//     const recentTickets = await Ticket.find().sort({ createdAt: -1 }).limit(5);
//     const categoryCounts = {};

//     // Extract search parameters from the request
//     const { searchParams } = new URL(request.url);
//     const query = searchParams.get("query") || "";

//     // Perform the search
//     const results = await Ticket.find({
//       title: { $regex: query, $options: "i" }, // Case-insensitive regex search
//     });

//     for (const category of categories) {
//       categoryCounts[category] = await Ticket.countDocuments({ category });
//     }

//     const totalTickets = await Ticket.countDocuments();
//     const solvedTickets = await Ticket.countDocuments({ status: "done" });
//     const activeTickets = await Ticket.countDocuments({ status: { $ne: "done" } });

//     return NextResponse.json(
//       {
//         recentTickets,
//         totalTickets,
//         solvedTickets,
//         activeTickets,
//         categoryCounts,
//       },
//       { results },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Error fetching stats", error }, { status: 500 });
//   }
// }




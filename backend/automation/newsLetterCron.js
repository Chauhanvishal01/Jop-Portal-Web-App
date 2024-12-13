import cron from "node-cron";
import { Job } from "../models/jobSchema.model.js";
import { User } from "../models/userSchema.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const jobs = await Job.find({ newsLettersSent: false });
    for (const job of jobs) {
      try {
        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });
        for (const user of filteredUsers) {
          const subject = `Job Alert : ${job.title} in ${job.jobNiche} Available Now`;
          const message = `
          Dear ${user.name},
        
          I hope this message finds you well.
        
          I am pleased to inform you that we have an exciting opportunity available for the position of ${job.title} at ${job.companyName}, located in ${job.location}. After reviewing your impressive qualifications and experience, we believe you would be an excellent fit for this role.
          
          This position is a ${job.jobType} role with our esteemed team at ${job.companyName}. It offers a competitive salary range of ${job.salary}, along with opportunities for professional growth and development within our organization.
          We are keen to move forward with your application and would like to schedule an interview at a time that is convenient for you. Please let us know your availability in the coming days so that we can arrange a meeting to discuss this opportunity in more detail.
          Should you have any questions or need further information before the interview, feel free to reach out. We look forward to the possibility of working together and are excited about the potential you bring to our team.
        
          Best of luck, and we hope to hear from you soon!

          Best Regards,
          Vishal & Team

          ${job.companyName}
        `;

          sendEmail({
            email: user.email,
            subject,
            message,
          });
        }

        job.newsLettersSent = true;
        console.log("Send email");

        await job.save();
      } catch (error) {
        console.log("Error in node CORN BLOCK");
        return next(console.error(error || "Some error in Cron"));
      }
    }
  });
};

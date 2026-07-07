import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description:
    "Agent calls the count-pages tool and reports the integration status",
  async test(t) {
    await t.send("How many pages are in the database right now?");
    t.succeeded();
    t.calledTool("count-pages");
    t.check(t.reply, includes("DATABASE_URL"));
  },
});

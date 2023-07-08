import { load } from "@std/dotenv/mod.ts";
import {
  getSupabaseClient,
} from "./supabase/functions/_shared/supabase-client.ts";
import {
  profileCreate,
  type ProfileCreateProps,
} from "./supabase/functions/profile-create/mod.ts";

const init = async () => {
  const env = await load();

  const supabase = getSupabaseClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  return {
    env,
    supabase,
  };
};

const main = async () => {
  const { supabase } = await init();

  const profile: ProfileCreateProps = {
    // id: createId(),
    type: "Individual" as const,
    slug: "fka",
    profilePictureUri: null,

    translations: {
      "tr": {
        title: "Fatih Kadir Akın",
        description: "desc",
      },
    },
  };

  const result = await profileCreate(supabase, profile, "tr");

  return result;
};

if (import.meta.main) {
  main();
}

export { main };

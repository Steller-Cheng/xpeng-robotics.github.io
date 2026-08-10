// Date: 2026-08-05
// Purpose: Drive benchmark tables, qualitative samples, rollout playback, and citation copying for the Capek 0.5 web poster.

const rolloutSteps = [
  ["Step 1", "assets/vigil_showcase/toaster_step_01.png", "navigate forward, 2", "The agent moves toward the table; no target interaction has been credited yet."],
  ["Step 2", "assets/vigil_showcase/toaster_step_02.png", "navigate forward, 2", "The agent continues toward the table and gathers better visual evidence."],
  ["Step 3", "assets/vigil_showcase/toaster_step_03.png", "interact_pixel activate(500,440)", "The call is aimed at the toaster, but no activation is credited."],
  ["Step 4", "assets/vigil_showcase/toaster_step_04.png", "interact_pixel activate(530,460)", "The visual state remains unchanged, so the agent keeps refining the interaction target."],
  ["Step 5", "assets/vigil_showcase/toaster_step_05.png", "interact_pixel activate(510,440)", "The model again attempts the toaster, but activation is still not credited."],
  ["Step 6", "assets/vigil_showcase/toaster_step_06.png", "interact_pixel activate(550,450)", "The call appears to land away from the toaster, so the required state is not reached."],
  ["Step 7", "assets/vigil_showcase/toaster_step_07.png", "navigate forward, 2", "The agent moves closer after repeated failed activation attempts."],
  ["Step 8", "assets/vigil_showcase/toaster_step_08.png", "interact_pixel activate(520,520)", "The activation call hits the toaster and the verifier marks the required object state as reached."],
  ["Step 9", "assets/vigil_showcase/toaster_step_09.png", "navigate forward, 1", "The activated state remains reached while the agent prepares the terminal report."],
  ["Step 10", "assets/vigil_showcase/toaster_step_10.png", "report success", "The final report matches the world state and closes the episode successfully."],
];

const embodiedSteps = [
  ["Start", "assets/samples/embodied_showcase/episode_10_step_0.png", "instruction issued", "The rollout starts from the task instruction before any environment-changing action."],
  ["Step 1", "assets/samples/embodied_showcase/episode_10_step_1.png", "action_id=34: find Knife", "The agent localizes the knife needed to transform the apple."],
  ["Step 2", "assets/samples/embodied_showcase/episode_10_step_2.png", "action_id=127: pick up Knife", "The knife is picked up successfully and becomes available for cutting."],
  ["Step 3", "assets/samples/embodied_showcase/episode_10_step_3.png", "action_id=22: find Apple", "The agent locates the target apple before the slicing step."],
  ["Step 4", "assets/samples/embodied_showcase/episode_10_step_4.png", "action_id=160: slice Apple", "The apple is sliced, completing the first task-critical state change."],
  ["Step 5", "assets/samples/embodied_showcase/episode_10_step_5.png", "action_id=16: find Bowl", "The agent finds a bowl so the knife can be set aside."],
  ["Step 6", "assets/samples/embodied_showcase/episode_10_step_6.png", "action_id=133: put knife in Bowl", "The knife is placed in the bowl, clearing the hand for the apple slice."],
  ["Step 7", "assets/samples/embodied_showcase/episode_10_step_7.png", "action_id=22: find Apple", "The agent reorients to the apple slice for microwave loading."],
  ["Step 8", "assets/samples/embodied_showcase/episode_10_step_8.png", "action_id=107: pick up Apple", "The apple slice is picked up for transfer."],
  ["Step 9", "assets/samples/embodied_showcase/episode_10_step_9.png", "action_id=38: find Microwave", "The agent locates the microwave target."],
  ["Step 10", "assets/samples/embodied_showcase/episode_10_step_10.png", "action_id=143: open Microwave", "The microwave is opened to receive the apple slice."],
  ["Step 11", "assets/samples/embodied_showcase/episode_10_step_11.png", "action_id=133: put apple in Microwave", "The apple slice is placed inside the microwave."],
  ["Step 12", "assets/samples/embodied_showcase/episode_10_step_12.png", "action_id=144: close Microwave", "The microwave door is closed before heating."],
  ["Step 13", "assets/samples/embodied_showcase/episode_10_step_13.png", "action_id=149: turn on Microwave", "The microwave is turned on to heat the apple slice."],
  ["Step 14", "assets/samples/embodied_showcase/episode_10_step_14.png", "action_id=150: turn off Microwave", "Heating is completed and the appliance is turned off."],
  ["Step 15", "assets/samples/embodied_showcase/episode_10_step_15.png", "action_id=143: open Microwave", "The microwave is opened so the heated apple can be retrieved."],
  ["Step 16", "assets/samples/embodied_showcase/episode_10_step_16.png", "action_id=22: find Apple", "The agent locates the heated apple slice inside the microwave context."],
  ["Step 17", "assets/samples/embodied_showcase/episode_10_step_17.png", "action_id=107: pick up Apple", "The heated apple slice is picked up."],
  ["Step 18", "assets/samples/embodied_showcase/episode_10_step_18.png", "action_id=144: close Microwave", "The microwave is closed after retrieval."],
  ["Step 19", "assets/samples/embodied_showcase/episode_10_step_19.png", "action_id=18: find DiningTable", "The agent finds the final placement surface."],
  ["Step 20", "assets/samples/embodied_showcase/episode_10_step_20.png", "action_id=133: place apple on DiningTable", "The heated apple slice is placed on the dining table, completing the task."],
];

const embodiedHabitatSteps = [
  ["Start", "assets/samples/embodied_showcase/episode_8_step_0.png", "instruction issued", "The rollout starts with a target object and destination but no executed action."],
  ["Step 1", "assets/samples/embodied_showcase/episode_8_step_1.png", "action_id=12: navigate to the sofa", "The agent checks the sofa as a likely location for the purple fruit."],
  ["Step 2", "assets/samples/embodied_showcase/episode_8_step_2.png", "action_id=30: pick up the plum", "The pick attempt fails because the plum is not near the robot."],
  ["Step 3", "assets/samples/embodied_showcase/episode_8_step_3.png", "action_id=6: navigate to table 1", "The agent searches another plausible support surface after the failed pick."],
  ["Step 4", "assets/samples/embodied_showcase/episode_8_step_4.png", "action_id=30: pick up the plum", "The second pick attempt also fails, so the agent continues searching."],
  ["Step 5", "assets/samples/embodied_showcase/episode_8_step_5.png", "action_id=10: navigate to the right counter", "The agent moves to the right kitchen counter where the target can be reached."],
  ["Step 6", "assets/samples/embodied_showcase/episode_8_step_6.png", "action_id=30: pick up the plum", "The plum is picked up successfully."],
  ["Step 7", "assets/samples/embodied_showcase/episode_8_step_7.png", "action_id=9: navigate to the sink", "The agent carries the plum to the requested destination."],
  ["Step 8", "assets/samples/embodied_showcase/episode_8_step_8.png", "action_id=53: place at the sink", "The plum is placed in the sink, completing the task."],
];

const vigilLaptopSteps = [
  ["Start", "assets/vigil_showcase/laptop_step_00.png", "instruction issued", "The laptop is still on the armchair before any environment-changing action."],
  ["Step 1", "assets/vigil_showcase/laptop_step_01.png", "interact_pixel pick(500,850)", "The laptop is visible on the armchair and is picked up successfully."],
  ["Step 2", "assets/vigil_showcase/laptop_step_02.png", "navigate turn_right, 90", "With the laptop held, the agent starts reorienting toward the living-room area."],
  ["Step 3", "assets/vigil_showcase/laptop_step_03.png", "navigate turn_right, 45", "The agent continues rotating to search for the coffee table."],
  ["Step 4", "assets/vigil_showcase/laptop_step_04.png", "navigate turn_right, 45", "The held laptop remains in view while the scene opens toward the target room."],
  ["Step 5", "assets/vigil_showcase/laptop_step_05.png", "navigate forward, 100", "The agent advances with the laptop toward the suspected placement area."],
  ["Step 6", "assets/vigil_showcase/laptop_step_06.png", "navigate turn_left, 90", "The agent corrects heading after entering the living-room space."],
  ["Step 7", "assets/vigil_showcase/laptop_step_07.png", "navigate forward, 50", "The coffee table becomes reachable as the agent moves closer."],
  ["Step 8", "assets/vigil_showcase/laptop_step_08.png", "navigate turn_right, 180", "The agent turns to face the placement surface more directly."],
  ["Step 9", "assets/vigil_showcase/laptop_step_09.png", "navigate forward, 50", "The final approach positions the held laptop above the coffee table."],
  ["Step 10", "assets/vigil_showcase/laptop_step_10.png", "interact_pixel place(450,950)", "The laptop is placed on the coffee table, satisfying the world-state goal."],
  ["Step 11", "assets/vigil_showcase/laptop_step_11.png", "report success", "The terminal report matches the completed rearrangement."],
];

const rolloutDemos = {
  "embodied-alf": {
    steps: embodiedSteps,
    intervalMs: 2200,
  },
  "embodied-habitat": {
    steps: embodiedHabitatSteps,
    intervalMs: 2100,
  },
  "vigil-toaster": {
    steps: rolloutSteps,
    intervalMs: 1800,
  },
  "vigil-laptop": {
    steps: vigilLaptopSteps,
    intervalMs: 1800,
  },
};

const samples = [
  {
    family: "State Verification",
    title: "Physical-state verification",
    selectorLabel: "Final object state",
    images: [
      "assets/samples/static_qa/statebench_psv_lighter_frame_1.png",
      "assets/samples/static_qa/statebench_psv_lighter_frame_2.png",
    ],
    question: "Based on observations, is the lighter on or off?",
    gt: "off; the final frame shows the lighter without an active flame, marked by the red dot.",
    modelAnswer: "off",
    detail: "The model compares the earlier green-dot frame with the later red-dot frame and returns the final lighter state.",
  },
  {
    family: "State Verification",
    title: "Task-state verification",
    selectorLabel: "Progress and next step",
    image: "assets/samples/static_qa/statebench_pve_packing_box.png",
    question: "Estimate completed task percentage and predict the immediate next action.",
    gt: '{"progress": 83.33, "next_action": "open the fridge door"}',
    modelAnswer: '{"progress": 75, "next_action": "open the refrigerator"}',
    detail: "The example probes progress estimation and next-step prediction from a causal visual prefix.",
  },
  {
    family: "Spatial Reasoning",
    title: "OpenEQA placement reasoning",
    selectorLabel: "Placement affordance",
    image: "assets/samples/static_qa/spatial_openeqa_1122.png",
    question: "Where can I place a bottle of shampoo while I shower?",
    gt: "On the tray in the shower area or on the bathtub ledge.",
    modelAnswer: "Place it on the small glass shelf on the wall inside the shower area.",
    detail: "The model searches across bathroom views and identifies a feasible support surface.",
  },
  {
    family: "Action Guidance",
    title: "Object-centric trajectory",
    selectorLabel: "Manipulation trajectory",
    image: "assets/samples/static_qa/ground_vabench_trace_yellow_to_pot.png",
    question: "Put the yellow object into the silver pot; output ordered waypoints.",
    gt: "The green waypoints indicate the GT trajectory into the silver pot.",
    modelAnswer: "The red waypoints indicate the predicted trajectory from the yellow object toward the pot.",
    detail: "The sample combines referent grounding with a structured action path; compare the green GT waypoints and red predicted waypoints.",
  },
  {
    family: "Action Guidance",
    title: "PIO grasp point",
    selectorLabel: "Grasp affordance",
    image: "assets/samples/static_qa/pointing_pio_gripper_handoff_47.png",
    question: "Where should the right gripper act to grasp the device?",
    gt: "The valid grasp area is around the component on the circuit board between the two grippers.",
    modelAnswer: "point_2d: [501, 722], shown as the red circular point on the board near the right gripper.",
    detail: "The output is an execution-relevant point rather than a free-form caption; the red marker indicates the selected grasp point.",
  },
  {
    family: "Action Guidance",
    title: "NaviTrace path selection",
    selectorLabel: "Navigation trajectory",
    image: "assets/samples/static_qa/trace_navitrace_right_tunnel_1241.png",
    question: "Take the right tunnel.",
    gt: "The green waypoints indicate the GT route into the right tunnel.",
    modelAnswer: "The red waypoints indicate the predicted route into the right tunnel; DFD = 0.045.",
    detail: "The qualitative rollout compares the green GT waypoints and red predicted waypoints for the chosen right-side tunnel.",
  },
  {
    family: "Temporal Understanding",
    title: "EgoTempo sequence reasoning",
    selectorLabel: "Temporal\nunderstanding",
    image: "assets/samples/static_qa/video_egotempo_grapes.png",
    question: "What happens after the person weighs the grapes?",
    gt: "Put the grapes into a plastic bag, then place the bag into the shopping basket.",
    modelAnswer: "The person puts the grapes into a plastic bag and places it in the shopping basket.",
    detail: "The answer requires following the frame sequence rather than recognizing one static frame.",
  },
  {
    family: "General Retention",
    title: "InfoVQA chart reading",
    selectorLabel: "General OCR",
    image: "assets/samples/static_qa/general_infovqa_price_spike_95160.png",
    question: "What caused unpredictable price spikes between 2010 and 2012?",
    gt: "Arab Spring, indicated by the arrow label on the bottom blue gas-price chart near 2011.",
    modelAnswer: "Arab Spring",
    detail: "General document and chart understanding is retained as a regression control; the answer comes from the annotated price-spike chart.",
  },
];

const resultTracks = {
  large: {
    title: "35B-A3B core benchmark leaderboard",
    summary: [
      ["Rank #1", "22 / 34", "best score in the full 35B-A3B matrix"],
      ["Top-2 coverage", "31 / 34", "rank #1 or #2 across benchmark rows"],
      ["vs Qwen3.6", "28 / 34", "matched rows improve over the Qwen3.6 initialization"],
      ["Temporal + State", "7 / 7", "rank #1 on all temporal and StateBench rows"],
    ],
    columns: [
      "Qwen3.6 35B-A3B",
      "Capek0.5 35B-A3B",
      "RynnBrain 30B-A3B",
      "MiMo-Embodied 7B",
      "Embodied-R1.5 8B",
      "RynnBrain1.1 9B",
      "HY-Embodied1.0 30B-A3B",
    ],
    rows: [
      ["Spatial Reasoning", "CV-Bench", "Score (%) up", "up", [88.56, 89.99, 88.62, 87.55, 87.03, 88.76, 89.39]],
      ["Spatial Reasoning", "VSI-Bench", "Score (%) up", "up", [60.83, 70.69, 75.30, 51.58, 64.78, 75.73, 59.47]],
      ["Spatial Reasoning", "OmniSpatial", "Score (%) up", "up", [58.84, 56.36, 51.27, 43.84, 47.36, 48.08, 56.56]],
      ["Spatial Reasoning", "MindCube", "Score (%) up", "up", [58.67, 69.90, 61.62, 35.71, 32.76, 79.24, 64.67]],
      ["Spatial Reasoning", "RoboSpatial-Home", "Score (%) up", "up", [63.46, 72.80, 63.95, 62.19, 63.75, 59.67, 65.98]],
      ["Spatial Reasoning", "All-Angles-Bench", "Score (%) up", "up", [65.43, 64.12, 50.70, 53.85, 50.19, 56.19, 62.85]],
      ["Spatial Reasoning", "EmbSpatial-Bench", "Score (%) up", "up", [82.94, 84.59, 80.99, 77.64, 76.62, 82.50, 82.25]],
      ["Spatial Reasoning", "ERQA", "Score (%) up", "up", [60.00, 58.25, 44.00, 43.25, 43.00, 47.50, 57.25]],
      ["Spatial Reasoning", "OpenEQA", "Score (%) up", "up", [67.48, 69.51, 56.17, 57.24, 55.58, 58.45, 58.48]],
      ["Action Guidance", "RoboRefIt", "Score (%) up", "up", [84.45, 85.96, 83.16, 77.63, 83.48, 82.09, 82.20]],
      ["Action Guidance", "PointBench", "Score (%) up", "up", [76.66, 81.22, 53.91, 58.01, 61.72, 53.63, 69.33]],
      ["Action Guidance", "VABench-point", "Score (%) up", "up", [54.71, 59.33, 4.67, 48.17, 72.34, 27.56, 60.59]],
      ["Action Guidance", "PixMoPointsEval", "F1 (%) up", "up", [62.42, 74.06, 63.29, 51.91, 65.96, 61.25, 57.94]],
      ["Action Guidance", "where2place", "Score (%) up", "up", [57.61, 73.52, 66.51, 57.86, 73.15, 74.63, 60.74]],
      ["Action Guidance", "ShareRobot-Affor.", "Score (%) up", "up", [29.22, 30.84, 27.58, 26.26, 19.39, 22.61, 26.19]],
      ["Action Guidance", "PIO", "Score (%) up", "up", [64.40, 71.60, 58.13, 54.43, 62.80, 64.33, 62.17]],
      ["Action Guidance", "NaviTrace", "Norm. score up", "up", [30.87, 42.80, -25.27, -11.18, -25.77, -12.39, -36.42]],
      ["Action Guidance", "VABench-trace", "RMSE down", "down", [139.28, 108.15, 173.44, 173.29, 85.57, 177.42, 132.40]],
      ["Action Guidance", "ShareRobot-Traj.", "DFD down", "down", [0.3518, 0.2390, 0.3061, 0.4169, 0.3052, 0.2757, 0.2317]],
      ["Temporal Understanding", "EgoTempo", "Score (%) up", "up", [38.20, 44.60, 30.00, 22.40, 32.60, 32.40, 19.20]],
      ["Temporal Understanding", "Video-MME", "Score (%) up", "up", [71.33, 74.19, 66.67, 65.78, 65.44, 68.30, 62.81]],
      ["Temporal Understanding", "MVBench", "Score (%) up", "up", [68.55, 71.32, 68.53, 58.13, 61.87, 67.89, 63.29]],
      ["Temporal Understanding", "LongVideoBench", "Score (%) up", "up", [60.48, 64.89, 64.14, 57.49, 59.48, 61.23, 59.40]],
      ["Temporal Understanding", "QVHighlights-TimeLens", "Score (%) up", "up", [54.82, 58.26, 39.37, 4.55, 47.53, 31.22, 35.07]],
      ["State Verification", "StateBench-P", "Score (%) up", "up", [65.80, 76.80, 73.40, 61.40, 60.60, 61.20, 55.80]],
      ["State Verification", "StateBench-T", "Score (%) up", "up", [43.76, 46.21, 33.39, 34.39, 32.06, 37.52, 37.38]],
      ["General", "MMMU", "Score (%) up", "up", [74.86, 76.19, 57.62, 63.05, 54.95, 58.86, 69.14]],
      ["General", "MMVet", "Score (%) up", "up", [80.09, 79.45, 58.07, 72.11, 65.28, 61.42, 69.40]],
      ["General", "RealWorldQA", "Score (%) up", "up", [82.09, 83.40, 73.46, 68.50, 69.80, 76.73, 76.99]],
      ["General", "MMBench-EN", "Score (%) up", "up", [92.35, 92.40, 90.30, 89.03, 88.89, 91.15, 92.26]],
      ["General", "IFEval", "Score (%) up", "up", [92.42, 91.31, 69.87, 76.52, 75.42, 87.43, 80.04]],
      ["General", "MMLU-Pro", "Score (%) up", "up", [84.39, 84.77, 60.06, 58.36, 59.98, 79.23, 77.19]],
      ["General", "BFCL-v3", "Score (%) up", "up", [58.75, 60.12, 10.00, 6.88, 23.75, 46.88, null]],
      ["General", "LiveCodeBench v6", "Score (%) up", "up", [77.31, 72.91, 30.87, 37.00, 28.63, 47.80, 44.27]],
    ],
  },
  compact: {
    title: "2B core benchmark leaderboard",
    summary: [
      ["Rank #1", "15 / 34", "best score in the full 2B matrix"],
      ["Top-2 coverage", "27 / 34", "rank #1 or #2 across benchmark rows"],
      ["vs Qwen3.5", "30 / 34", "matched rows improve over the Qwen3.5 initialization"],
      ["Action outputs", "10 / 10", "all action-guidance rows improve over Qwen3.5"],
    ],
    columns: ["Qwen3.5 2B", "Capek0.5 2B", "RynnBrain1.1 2B", "RoboBrain2.5 4B"],
    rows: [
      ["Spatial Reasoning", "CV-Bench", "Score (%) up", "up", [83.10, 86.02, 86.49, 86.90]],
      ["Spatial Reasoning", "VSI-Bench", "Score (%) up", "up", [37.05, 55.00, 73.83, 49.80]],
      ["Spatial Reasoning", "OmniSpatial", "Score (%) up", "up", [46.18, 50.16, 39.73, 41.62]],
      ["Spatial Reasoning", "MindCube", "Score (%) up", "up", [36.00, 47.62, 54.86, 30.48]],
      ["Spatial Reasoning", "RoboSpatial-Home", "Score (%) up", "up", [25.52, 38.13, 59.95, 39.71]],
      ["Spatial Reasoning", "All-Angles-Bench", "Score (%) up", "up", [49.11, 53.38, 44.28, 47.37]],
      ["Spatial Reasoning", "EmbSpatial-Bench", "Score (%) up", "up", [76.13, 78.68, 72.80, 73.30]],
      ["Spatial Reasoning", "ERQA", "Score (%) up", "up", [35.00, 46.25, 41.25, 43.75]],
      ["Spatial Reasoning", "OpenEQA", "Score (%) up", "up", [51.48, 57.78, 50.70, 56.07]],
      ["Action Guidance", "RoboRefIt", "Score (%) up", "up", [76.50, 79.89, 78.97, 3.01]],
      ["Action Guidance", "PointBench", "Score (%) up", "up", [56.83, 68.55, 51.76, 67.13]],
      ["Action Guidance", "VABench-point", "Score (%) up", "up", [7.13, 36.00, 14.44, 25.27]],
      ["Action Guidance", "PixMoPointsEval", "F1 (%) up", "up", [33.90, 52.94, 52.01, 61.02]],
      ["Action Guidance", "where2place", "Score (%) up", "up", [29.16, 35.86, 66.46, 70.42]],
      ["Action Guidance", "ShareRobot-Affordance", "Score (%) up", "up", [18.33, 29.18, 24.33, 50.43]],
      ["Action Guidance", "PIO", "Score (%) up", "up", [25.17, 49.76, 59.60, 58.43]],
      ["Action Guidance", "NaviTrace", "Norm. score up", "up", [-42.08, 12.59, -20.74, -20.43]],
      ["Action Guidance", "VABench-trace", "RMSE down", "down", [255.47, 160.63, 216.83, 155.10]],
      ["Action Guidance", "ShareRobot-Trajectory", "DFD down", "down", [0.5689, 0.2683, 0.2823, 0.1619]],
      ["Temporal Understanding", "EgoTempo", "Score (%) up", "up", [29.60, 33.40, 23.40, 34.40]],
      ["Temporal Understanding", "Video-MME", "Score (%) up", "up", [50.70, 61.30, 59.96, 62.78]],
      ["Temporal Understanding", "MVBench", "Score (%) up", "up", [47.79, 58.58, 60.47, 60.08]],
      ["Temporal Understanding", "LongVideoBench", "Score (%) up", "up", [48.00, 58.07, 54.33, 58.65]],
      ["Temporal Understanding", "QVHighlights-TimeLens", "Score (%) up", "up", [46.62, 44.72, 28.09, 51.72]],
      ["State Verification", "StateBench-P", "Score (%) up", "up", [56.00, 65.40, 59.00, 59.20]],
      ["State Verification", "StateBench-T", "Score (%) up", "up", [25.52, 33.46, 27.92, 26.79]],
      ["General", "MMMU", "Score (%) up", "up", [56.86, 59.71, 44.29, 53.05]],
      ["General", "MMVet", "Score (%) up", "up", [62.02, 62.48, 46.51, 65.97]],
      ["General", "RealWorldQA", "Score (%) up", "up", [76.08, 75.69, 72.03, 68.76]],
      ["General", "MMBench-EN", "Score (%) up", "up", [88.45, 88.20, 86.90, 88.54]],
      ["General", "IFEval", "Score (%) up", "up", [81.52, 81.70, 63.59, 70.61]],
      ["General", "MMLU-Pro", "Score (%) up", "up", [62.57, 61.30, 37.57, 54.20]],
      ["General", "BFCL-v3", "Score (%) up", "up", [25.37, 25.75, 2.00, 0.13]],
      ["General", "LiveCodeBench v6", "Score (%) up", "up", [11.01, 26.65, 10.79, 16.96]],
    ],
  },
};

const selectedBenchmarkNames = {
  large: [
    "StateBench-P",
    "StateBench-T",
    "VSI-Bench",
    "MindCube",
    "EmbSpatial-Bench",
    "ERQA",
    "OpenEQA",
    "RoboRefIt",
    "PointBench",
    "PixMoPointsEval",
    "PIO",
    "NaviTrace",
    "EgoTempo",
    "Video-MME",
    "RealWorldQA",
  ],
  compact: [
    "StateBench-P",
    "StateBench-T",
    "VSI-Bench",
    "OmniSpatial",
    "MindCube",
    "EmbSpatial-Bench",
    "ERQA",
    "OpenEQA",
    "RoboRefIt",
    "PointBench",
    "PixMoPointsEval",
    "PIO",
    "NaviTrace",
    "Video-MME",
    "LiveCodeBench v6",
  ],
};

const state = {
  track: "large",
  benchmarkScope: "selected",
  rollouts: Object.fromEntries(
    Object.keys(rolloutDemos).map((key) => [key, { step: 0, playing: true, timerId: null }]),
  ),
};

const benchmarkFamilyClasses = {
  "Spatial Reasoning": "family-spatial",
  "Temporal Understanding": "family-temporal",
  "Action Guidance": "family-guidance",
  "State Verification": "family-state",
  General: "family-general",
};

const rankGrid = document.querySelector("#rankGrid");
const benchmarkTableTitle = document.querySelector("#benchmarkTableTitle");
const benchmarkTable = document.querySelector("#benchmarkTable");
const tabButtons = document.querySelectorAll(".tab-button");
const scopeButtons = document.querySelectorAll(".scope-button");
const sampleViewer = document.querySelector("#sampleViewer");
const sampleFamily = document.querySelector("#sampleFamily");
const sampleTitle = document.querySelector("#sampleTitle");
const sampleQuestion = document.querySelector("#sampleQuestion");
const sampleGt = document.querySelector("#sampleGt");
const sampleModelAnswer = document.querySelector("#sampleModelAnswer");
const sampleDetail = document.querySelector("#sampleDetail");
const sampleGrid = document.querySelector("#sampleGrid");
const rolloutElements = [...document.querySelectorAll("[data-rollout-key]")].reduce((items, card) => {
  items[card.dataset.rolloutKey] = {
    card,
    image: card.querySelector("[data-rollout-image]"),
    stepTitle: card.querySelector("[data-rollout-step-title]"),
    command: card.querySelector("[data-rollout-command]"),
    outcome: card.querySelector("[data-rollout-outcome]"),
    range: card.querySelector("[data-rollout-range]"),
    playButton: card.querySelector("[data-rollout-play]"),
    stepButtons: card.querySelector("[data-rollout-step-buttons]"),
  };
  return items;
}, {});
const copyCitationButton = document.querySelector("#copyCitationButton");
const citationText = document.querySelector("#citationText");
const imageLightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxClose = document.querySelector("#lightboxClose");

function formatValue(value) {
  if (value === null || value === undefined) return "-";
  if (Math.abs(value) < 1 && value !== 0) return value.toFixed(4);
  return value.toFixed(2);
}

function formatMetric(metric) {
  return metric.replace(/\s+up$/, " ↑").replace(/\s+down$/, " ↓");
}

function rankedValueClasses(values, direction) {
  return rankedValueMetadata(values, direction).map(({ classes }) => classes.join(" "));
}

function rankedValueMetadata(values, direction) {
  const validValues = values.filter((value) => value !== null && value !== undefined);
  const orderedDistinct = [...new Set(validValues)].sort((a, b) =>
    direction === "down" ? a - b : b - a,
  );
  const best = orderedDistinct[0];
  const second = orderedDistinct[1];

  return values.map((value, index) => {
    const classes = [];
    if (index === 1) classes.push("capek-cell");
    if (value === best) classes.push("best-cell");
    if (value === second) classes.push("second-cell");
    if (value !== null && value !== undefined) classes.push("score-cell");
    return {
      classes,
      rank: value === null || value === undefined ? null : orderedDistinct.indexOf(value) + 1,
      total: orderedDistinct.length,
    };
  });
}

function renderSummary() {
  rankGrid.innerHTML = "";
  resultTracks[state.track].summary.forEach(([label, value, detail]) => {
    const article = document.createElement("article");
    article.className = "rank-card";
    article.innerHTML = `<p class="label">${label}</p><div>${value}</div><span>${detail}</span>`;
    rankGrid.appendChild(article);
  });
}

function renderTable() {
  const track = resultTracks[state.track];
  const selectedNames = selectedBenchmarkNames[state.track];
  const visibleRows = state.benchmarkScope === "all"
    ? track.rows
    : track.rows.filter(([, benchmark]) => selectedNames.includes(benchmark));
  const capekColumnIndex = track.columns.findIndex((column) => column.startsWith("Capek0.5"));
  const displayColumnIndexes = [
    capekColumnIndex,
    ...track.columns.map((_, index) => index).filter((index) => index !== capekColumnIndex),
  ];
  const scopeLabel = state.benchmarkScope === "all" ? `All ${track.rows.length} rows` : "Selected 15 rows";
  benchmarkTableTitle.textContent = `${track.title} · ${scopeLabel}`;
  const thead = benchmarkTable.querySelector("thead");
  const tbody = benchmarkTable.querySelector("tbody");
  const headerCells = [
    "Family",
    "Benchmark · metric",
    ...displayColumnIndexes.map((index) => track.columns[index]),
  ];
  thead.innerHTML = `<tr>${headerCells.map((cell) => `<th>${cell}</th>`).join("")}</tr>`;

  const familySpans = visibleRows.reduce((counts, [family]) => {
    counts[family] = (counts[family] || 0) + 1;
    return counts;
  }, {});
  const seenFamilies = new Set();

  tbody.innerHTML = visibleRows
    .map(([family, benchmark, metric, direction, values]) => {
      const familyClass = benchmarkFamilyClasses[family] || "family-general";
      const valueMetadata = rankedValueMetadata(values, direction);
      const valueCells = displayColumnIndexes
        .map((index) => {
          const value = values[index];
          const { classes, rank, total } = valueMetadata[index];
          const rankLabel = rank ? `rank #${rank} / ${total}` : "";
          const rankAttrs = rankLabel
            ? ` data-rank-label="${rankLabel}" aria-label="${track.columns[index]} ${formatValue(value)}, rank ${rank} of ${total}"`
            : "";
          return `<td class="${classes.join(" ")}"${rankAttrs}>${formatValue(value)}</td>`;
        })
        .join("");
      const familyCell = seenFamilies.has(family)
        ? ""
        : `<td class="family-cell ${familyClass}" rowspan="${familySpans[family]}">${family}</td>`;
      seenFamilies.add(family);
      return `
        <tr class="${familyClass}">
          ${familyCell}
          <td class="benchmark-cell ${familyClass}"><span class="benchmark-name">${benchmark}</span><span class="benchmark-metric">${formatMetric(metric)}</span></td>
          ${valueCells}
        </tr>
      `;
    })
    .join("");
}

function renderSamples() {
  sampleGrid.innerHTML = "";
  samples.forEach((sample, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === 0 ? "sample-thumb active" : "sample-thumb";
    button.innerHTML = `<span>${sample.selectorLabel}</span>`;
    button.addEventListener("click", () => setSample(index));
    sampleGrid.appendChild(button);
  });
}

function setSample(index) {
  const sample = samples[index];
  const imageSources = sample.images || [sample.image];
  sampleViewer.classList.toggle("multi-image-viewer", imageSources.length > 1);
  sampleViewer.innerHTML = imageSources
    .map((image, imageIndex) => `<img src="${image}" alt="${sample.title}${imageSources.length > 1 ? ` observation ${imageIndex + 1}` : ""}" />`)
    .join("");
  sampleViewer.querySelectorAll("img").forEach(makeImageZoomable);
  sampleFamily.textContent = sample.family;
  sampleTitle.textContent = sample.title;
  sampleQuestion.textContent = sample.question;
  sampleGt.textContent = sample.gt;
  sampleModelAnswer.textContent = sample.modelAnswer;
  sampleDetail.textContent = sample.detail;
  [...sampleGrid.children].forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });
}

function setDemoRolloutStep(key, index) {
  const demo = rolloutDemos[key];
  const rolloutState = state.rollouts[key];
  const elements = rolloutElements[key];
  if (!demo || !rolloutState || !elements) return;

  rolloutState.step = (index + demo.steps.length) % demo.steps.length;
  const [step, image, command, outcome] = demo.steps[rolloutState.step];
  elements.image.src = image;
  elements.image.alt = `${step} rollout frame`;
  elements.stepTitle.textContent = step;
  elements.command.textContent = command;
  elements.outcome.textContent = outcome;
  elements.range.value = String(rolloutState.step);
  [...elements.stepButtons.children].forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === rolloutState.step);
  });
}

function setDemoPlaying(key, nextPlaying) {
  const demo = rolloutDemos[key];
  const rolloutState = state.rollouts[key];
  const elements = rolloutElements[key];
  if (!demo || !rolloutState || !elements) return;

  rolloutState.playing = nextPlaying;
  elements.playButton.textContent = rolloutState.playing ? "Pause" : "Play";
  if (rolloutState.timerId) window.clearInterval(rolloutState.timerId);
  rolloutState.timerId = rolloutState.playing
    ? window.setInterval(() => setDemoRolloutStep(key, rolloutState.step + 1), demo.intervalMs)
    : null;
}

function renderDemoRolloutControls(key) {
  const demo = rolloutDemos[key];
  const elements = rolloutElements[key];
  if (!demo || !elements) return;

  elements.range.max = String(demo.steps.length - 1);
  elements.stepButtons.innerHTML = "";
  demo.steps.forEach(([step], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", step);
    button.addEventListener("click", () => {
      setDemoRolloutStep(key, index);
      setDemoPlaying(key, false);
    });
    elements.stepButtons.appendChild(button);
  });
}

function initRolloutDemos() {
  Object.keys(rolloutElements).forEach((key) => {
    const elements = rolloutElements[key];
    if (!rolloutDemos[key] || !state.rollouts[key]) return;
    renderDemoRolloutControls(key);
    elements.playButton.addEventListener("click", () => {
      setDemoPlaying(key, !state.rollouts[key].playing);
    });
    elements.range.addEventListener("input", (event) => {
      setDemoRolloutStep(key, Number(event.target.value));
      setDemoPlaying(key, false);
    });
    setDemoRolloutStep(key, 0);
    setDemoPlaying(key, true);
  });
}

function findImageCaption(image) {
  const figure = image.closest("figure");
  if (!figure) return image.alt;
  const caption = figure.querySelector("figcaption");
  return caption ? caption.textContent.trim() : image.alt;
}

function openImageLightbox(image) {
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Enlarged poster image";
  lightboxCaption.textContent = findImageCaption(image);
  imageLightbox.classList.add("open");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeImageLightbox() {
  imageLightbox.classList.remove("open");
  imageLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
  lightboxCaption.textContent = "";
}

function makeImageZoomable(image) {
  image.classList.add("zoomable-image");
  image.setAttribute("tabindex", "0");
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `${image.alt || "Image"} - click to enlarge`);
}

function initImageLightbox() {
  document.querySelectorAll("main img").forEach((image) => {
    makeImageZoomable(image);
  });

  document.querySelector("main").addEventListener("click", (event) => {
    const image = event.target.closest("img.zoomable-image");
    if (image) openImageLightbox(image);
  });

  document.querySelector("main").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const image = event.target.closest("img.zoomable-image");
    if (!image) return;
    event.preventDefault();
    openImageLightbox(image);
  });

  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox || event.target === lightboxImage) closeImageLightbox();
  });

  lightboxClose.addEventListener("click", closeImageLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageLightbox.classList.contains("open")) {
      closeImageLightbox();
    }
  });
}

function rectanglesOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function resolveDomainChartLabelCollisions() {
  document.querySelectorAll(".hero-domain-chart .bars").forEach((group) => {
    const labels = [...group.querySelectorAll(".bar strong")];
    labels.forEach((label) => label.style.setProperty("--label-offset", "0px"));

    const placed = [];
    labels.forEach((label) => {
      const baseRect = label.getBoundingClientRect();
      const paddedBase = {
        left: baseRect.left - 2,
        right: baseRect.right + 2,
        top: baseRect.top - 1,
        bottom: baseRect.bottom + 1,
      };
      let offset = 0;

      for (const candidate of [0, -9, -18]) {
        const candidateRect = {
          left: paddedBase.left,
          right: paddedBase.right,
          top: paddedBase.top + candidate,
          bottom: paddedBase.bottom + candidate,
        };
        offset = candidate;
        if (!placed.some((rect) => rectanglesOverlap(candidateRect, rect))) {
          placed.push(candidateRect);
          break;
        }
      }

      label.style.setProperty("--label-offset", `${offset}px`);
    });
  });
}

function initDomainChartLabels() {
  window.requestAnimationFrame(resolveDomainChartLabelCollisions);
  window.addEventListener("resize", () => {
    window.requestAnimationFrame(resolveDomainChartLabelCollisions);
  });
}

function initDomainChartHover() {
  const chart = document.querySelector(".hero-domain-chart");
  if (!chart) return;

  chart.querySelectorAll(".bar").forEach((bar) => {
    const modelClass = [...bar.classList].find((className) => className === "capek" || className.startsWith("model-"));
    if (!modelClass) return;
    bar.dataset.model = modelClass;
    bar.setAttribute("tabindex", "0");
    bar.addEventListener("mouseenter", () => {
      chart.dataset.hoverModel = modelClass;
    });
    bar.addEventListener("focus", () => {
      chart.dataset.hoverModel = modelClass;
    });
    bar.addEventListener("mouseleave", () => {
      delete chart.dataset.hoverModel;
    });
    bar.addEventListener("blur", () => {
      delete chart.dataset.hoverModel;
    });
  });
}

function initDataCompositionHover() {
  const chart = document.querySelector(".data-composition-chart");
  if (!chart) return;

  const clearActive = () => {
    chart.querySelectorAll(".is-data-active, .is-data-family-active").forEach((item) => {
      item.classList.remove("is-data-active", "is-data-family-active");
    });
    delete chart.dataset.hoverMode;
    delete chart.dataset.hoverFamily;
    delete chart.dataset.hoverDetail;
  };

  const activateFamily = (family) => {
    clearActive();
    chart.dataset.hoverMode = "family";
    chart.dataset.hoverFamily = family;
    chart.querySelectorAll(`[data-data-family="${family}"]`).forEach((item) => {
      item.classList.add("is-data-active");
    });
    chart.querySelectorAll(`.data-family[data-data-family="${family}"] h4`).forEach((item) => {
      item.classList.add("is-data-active");
    });
  };

  const activateDetail = (family, detail) => {
    clearActive();
    chart.dataset.hoverMode = "detail";
    chart.dataset.hoverFamily = family;
    chart.dataset.hoverDetail = detail;
    chart.querySelectorAll(`[data-data-detail="${detail}"]`).forEach((item) => {
      item.classList.add("is-data-active");
    });
    chart.querySelectorAll(`.donut-inner [data-data-family="${family}"], .data-family[data-data-family="${family}"] h4`).forEach((item) => {
      item.classList.add("is-data-family-active");
    });
  };

  chart.querySelectorAll(".donut-inner .donut-segment, .donut-outer .donut-segment, .data-family h4, .data-family p").forEach((item) => {
    const family = item.dataset.dataFamily || item.closest(".data-family")?.dataset.dataFamily;
    const detail = item.dataset.dataDetail;
    if (!family) return;

    const activate = () => {
      if (detail) {
        activateDetail(family, detail);
      } else {
        activateFamily(family);
      }
    };

    item.addEventListener("mouseenter", activate);
    item.addEventListener("mouseleave", clearActive);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.track = button.dataset.track;
    tabButtons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-selected", String(active));
    });
    renderSummary();
    renderTable();
  });
});

scopeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.benchmarkScope = button.dataset.scope;
    scopeButtons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    renderTable();
  });
});

copyCitationButton.addEventListener("click", async () => {
  const text = citationText.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyCitationButton.textContent = "Copied";
  } catch {
    copyCitationButton.textContent = "Select BibTeX";
  }
  window.setTimeout(() => {
    copyCitationButton.textContent = "Copy BibTeX";
  }, 1600);
});

renderSummary();
renderTable();
renderSamples();
initRolloutDemos();
initImageLightbox();
initDomainChartLabels();
initDomainChartHover();
initDataCompositionHover();
setSample(0);

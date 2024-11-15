<script>
  import { AppBar, ProgressRadial } from '@skeletonlabs/skeleton';
</script>

<AppBar
  gridColumns="grid-cols-3"
  slotDefault="place-self-center text-center"
  slotTrail="place-content-end"
  ><svelte:fragment slot="default"><div class="text-xl">My App</div></svelte:fragment>
  <svelte:fragment slot="lead">Back</svelte:fragment>
  <svelte:fragment slot="trail"
    ><div class="bg-black h-10 rounded-full text-white w-10 flex items-center justify-center">
      CT
    </div></svelte:fragment
  ></AppBar
>
<div class="flex flex-col items-center gap-4 p-4">
  <div class="alert variant-filled-error max-w-96">
    <div>⚠️</div>
    <div class="alert-message">
      <h3>Warning</h3>
      <p>
        Admiratio acceptus currus concido depraedor illum cresco thalassinus. Derideo pauper
        varietas aspernatur magni.
      </p>
    </div>
    <div class="alert-actions"><div class="btn variant-filled cursor-pointer">Okay</div></div>
  </div>
  <div>
    <div class="flex flex-col gap-2 w-96">
      <div class="text-xl">Contact Us</div>
      <label class="label"><span>Name</span> <input class="input" type="text" /></label>
      <label class="label"
        ><span>How did you hear about us?</span>
        <select class="select">
          <option>ChatGPT</option>
        </select></label
      >
      <label class="label"
        ><span>Message</span> <textarea class="textarea" rows="4"></textarea>
      </label>
      <button class="btn variant-filled cursor-pointer w-full" disabled="">
        <div>Sending...</div>
        <ProgressRadial width="w-6"></ProgressRadial>
      </button>
    </div>
  </div>
</div>
<style></style>

<script>
  import Draw from "./components/Draw.svelte";
  import Chat from "./components/Chat.svelte";
  import Draggable from "./components/Draggable.svelte";

  if ("serviceWorker" in navigator)
    navigator.serviceWorker.register("/serviceWorker.js")
            .then(() => console.log("Service worker registered!"))
            .catch(err => console.error("Failed to register service worker", err))

  import "./lib/Tailwind.svelte"
  import "./style.css"

  import io from 'socket.io-client'

  const socket = io()
  const sendEvent = (eventName, data) => socket.emit(eventName, data)

  let onDrawingEvent;
  socket.on('drawing', e => onDrawingEvent(e));

  let newMessage;
  socket.on('message', e => newMessage(e))


  let scrollable = false;
  const wheel = (node, options) => {
    let { scrollable } = options;
    const handler = e => {
      if (!scrollable) e.preventDefault();
    };
    node.addEventListener('wheel', handler, { passive: false });
    return {
      update(options) {
        scrollable = options.scrollable;
      },
      destroy() {
        node.removeEventListener('wheel', handler, { passive: false });
      }
    };
  };

</script>

<svelte:window use:wheel={{scrollable}} />

<main class="flex flex-col h-screen w-screen bg-fade relative">

  <section class="flex sm:flex-row flex-1 w-full">

    <Draw bind:onDrawingEvent={onDrawingEvent} on:drawing={e => sendEvent('drawing', e.detail)}/>

    <Draggable>
      <Chat bind:newMessage={newMessage} on:message={e => sendEvent('message', e.detail)}/>
    </Draggable>

  </section>

</main>

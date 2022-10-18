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

  let ws;
  const sendEvent = (event, data) => ws.send(JSON.stringify({event: event, data: data}))

  let onDrawingEvent;
  let newMessage;

  const connect = () => {

    ws = new WebSocket((location.protocol === 'https:'? 'wss://': 'ws://')+ location.host);

    ws.onopen = res => {

      console.log('Successfully Connected To Server Socket')
      ws.onmessage = message => {

        const data = JSON.parse(message.data)

        if (data.event && data.event === 'drawing')
          onDrawingEvent(data.data)

        if (data.event && data.event === 'message')
          newMessage(data.data)

      };

      ws.onclose = () => {
        console.log('Retrying Connection');
        connect();
      }

    };

    ws.onerror = error => {
      console.error('Failed to connect. Retrying in 3 seconds', error)
      setTimeout(connect, 3000)
    }

  }
  connect();

</script>


<main class="flex flex-col h-screen w-screen bg-fade relative">

  <section class="flex sm:flex-row flex-1 w-full">

    <Draw bind:onDrawingEvent={onDrawingEvent} on:drawing={e => sendEvent('drawing', e.detail)}/>

    <Draggable>
      <Chat bind:newMessage={newMessage} on:message={e => sendEvent('message', e.detail)}/>
    </Draggable>

  </section>

</main>

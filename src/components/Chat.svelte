<script>
    import {createEventDispatcher, afterUpdate} from "svelte";
    let dispatch = createEventDispatcher();

    let messages = [];
    let message = "";

    export const newMessage = message => {
        messages.push(message)
        messages = messages;
    }

    const sendMessage = () => {
        if (message.length>0) {
            messages.push({user: 'Me', message: message})
            dispatch('message', message)
            message = "";
            messages = messages;
        }
    }

    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    };

    let scroll;
    $: if (scroll && messages) scrollToBottom(scroll)
    afterUpdate(() => {if (scroll) scrollToBottom(scroll)})

</script>

<div>

    <div class="bg-primary rounded-t flex justify-between gap-2">
        <h4 class="pl-4 pr-8 py-2">Chat</h4>
    </div>

    <ul class="bg-white p-2 max-h-72 overflow-auto" bind:this={scroll}>
        {#each messages as message}
            <li class="bg-fade rounded p-1 m-2">{message.user.substr(0, 5)}: {message.message}</li>
        {/each}
    </ul>

    <form class="bg-white p-1 flex" on:submit|preventDefault={sendMessage}>
        <input bind:value={message} type="text" placeholder="Type Message" class="rounded border border-fade outline-fade flex-1 px-2 text-primary" aria-label="Message">
    </form>

</div>
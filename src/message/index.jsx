const MessageIndex = () => {
    const members = [
        {
            avatar: "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
            name: "John lorin",
            email: "john@example.com"
        }, {
            avatar: "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
            name: "Chris bondi",
            email: "chridbondi@example.com"
        }, {
            avatar: "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
            name: "yasmine",
            email: "yasmine@example.com"
        }, {
            avatar: "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
            name: "Joseph",
            email: "joseph@example.com"
        },
    ]
    return (
        <div className="max-w-2xl border-r px-6" >
            <div className="items-start border-b justify-between sm:flex">
                <div>
                    <h4 className="text-gray-800 text-2xl font-semibold">Message</h4>
                    <p className="mt-0 mb-2 text-gray-600 text-base sm:text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
                </div>
            </div>
            <ul className="divide-y">
                {
                    members.map((item, idx) => (
                        <li key={idx} className="py-5 flex items-start justify-between">
                            <div className="flex gap-3">
                                <img src={item.avatar} className="flex-none w-12 h-12 rounded-full" alt="" />
                                <div>
                                    <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                                    <span className="block text-sm text-gray-600">{item.email}</span>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export default MessageIndex;
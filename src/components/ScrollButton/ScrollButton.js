import { ChevronUpIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./ScrollButton.css";

function ScrollButton({ elementRef }) {
	const [visible, setVisible] = useState(false);

    //TODO: make it work
	const toggleVisible = () => {
		const scrolled = elementRef.current.scrollTop;
		console.log(scrolled);
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		elementRef.current.scrollTo(0, 0);
	};

	window.addEventListener("scroll", toggleVisible);

	return (
		<Button onClick={scrollToTop}>
			<ChevronUpIcon className="go-up-icon" />
		</Button>
	);
}

export default ScrollButton;

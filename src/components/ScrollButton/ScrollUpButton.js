import { ChevronUpIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./ScrollUpButton.css";

function ScrollUpButton({ elementRef }) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		elementRef.current.addEventListener("scroll", toggleVisible);
	})

	const toggleVisible = () => {
		const scrolled = elementRef.current.scrollTop;
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		elementRef.current.scrollTo(0, 0);
	};

	return ( visible &&
		<Button className="go-up-button" onClick={scrollToTop}>
			<ChevronUpIcon className="go-up-icon" />
		</Button>
	);
}

export default ScrollUpButton;

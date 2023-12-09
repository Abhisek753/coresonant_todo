import React, { useEffect, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
} from "reactstrap";
import { gettasksListService } from "../../services/addSkill.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Index.module.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => {
    const navigate = useNavigate();

    const [addNewModal, setAddNewModal] = useState(false);
    const [editNewModal, setEditNewModal] = useState(false);
    const [listingdata, setListingData] = useState([]);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(
        Array(listingdata.length).fill(false)
    );
    const [deleteError, setDeleteError] = useState("");
    const [title, setTitle] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [editTask, setEditTask] = useState({});
    const [error, setError] = useState({ addError: false, editError: false });
    const [filterOption, setFilterOption] = useState("all");
    const notify = () => {
        toast.success("Task is deleted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const handleChange = (val) => {
        setTitle(val);
    };
    const handleEditChange = (name, val) => {
        console.log(name, val, editTask);
        setEditTask({ ...editTask, [name]: val });
        setNewTitle(val, title);
    };
    const handleUpdateTask = () => {
        if (editTask.title != "") {
            if (!editTask) return;

            const updatedListingData = listingdata.map((item) =>
                item.id === editTask.id ? { ...item, title: newTitle } : item
            );

            setListingData(updatedListingData);
            toast.success("Task Edited Successfully")

            setEditNewModal(false);
        }
        else {
            setError({ editError: true });
        }
    };

    const handleEditModalToggle = (task) => {
        setEditTask(task);
        setEditNewModal(!editNewModal);
        setError({ editError: false });
    };

    const handleSubmit = async () => {
        if (title != "") {
            const newData = {
                userId: 1,
                id: listingdata.length + 1,
                title,
                completed: false,
            };
            setListingData([...listingdata, newData]);
            handleAddToggle();
            toast.success("Task Added Successfully")
        }
        else {
            setError({ addError: true });
        }
    };
    const handleAddToggle = () => {
        setAddNewModal(!addNewModal);
        setTitle("");
        setError({ addError: false })
    };

    const getEditSkillData = (id) => { };

    //GET SKILL DATA
    const getData = async (searchQuery) => {
        gettasksListService()
            .then((response) => {
                setListingData(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleSearch = (e) => { };

    const handleDelete = async (task) => {
        const updatedListingData = listingdata.filter(
            (item) => item.id !== task.id
        );
        setListingData(updatedListingData);

        closeDeleteModal();
        notify();
    };

    const openDeleteModal = (id) => {
        setDeleteTaskId(id);
        setDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setDeleteTaskId("");
        setDeleteModal(false);
        setDeleteError("");
    };

    const toggleDropdown = (index) => {
        const newDropdownOpen = [...dropdownOpen];
        newDropdownOpen[index] = !newDropdownOpen[index];
        setDropdownOpen(newDropdownOpen);
    };

    useEffect(() => {
        getData();
        // getSkillType();
    }, []);
    const handleStatusToggle = (toggle, index) => {
        let newArray = [...listingdata];
        newArray[index].completed = toggle;
        setListingData(newArray);
    }

    const filteredData = listingdata.filter((item) => {
     
     if (filterOption === "completed") {
            return item.completed;
        }
        // If filterOption is not "all" or "completed", return false (for incomplete tasks)
        return item;
    });

    return (
        <div>
            <div className="page_heading">
                <div>
                    <h4>Tasks</h4>
                </div>
                <div>
                    <Button className="btn btn-primary mb-3" onClick={handleAddToggle}>
                        Add New Task
                    </Button>
                </div>
            </div>
            <div className="row mt-3">
                <div
                    className={`col-md-4 form-group cursor-pointer ml-2 ${styles.select_box}`}
                >
                    <Input
                        type="select"
                        onChange={(e) => setFilterOption(e.target.value)}
                    >
                        <option value="all">All Tasks</option>
                        <option value="completed">Completed Tasks</option>
                    </Input>
                </div>

                <div className="col-md-4"></div>
            </div>
            <div className="mt-2">
                <div>
                    <div className={styles.table_max_height}>
                        <Table
                            hover
                            className={`table_headerfix ${styles.appraisal_skilllist}`}
                        >
                            <thead className={styles.table_header}>
                                <tr>
                                    <th style={{ width: "300px" }} className="border-top-0">
                                        #
                                    </th>
                                    <th className="border-top-0">Title</th>
                                    <th className="border-top-0">Status</th>
                                    <th
                                        className="text-center border-top-0"
                                        style={{ width: "75px" }}
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={styles.table_body}>
                                {filteredData.length > 0 &&
                                    filteredData.map((item, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{item.title}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={item.completed}
                                                    onChange={() => handleStatusToggle(!item.completed, i)}
                                                    className="ms-3"
                                                />
                                            </td>

                                            <td className="threedot text-center ">
                                                <Dropdown
                                                    isOpen={dropdownOpen[i]}
                                                    toggle={() => toggleDropdown(i)}
                                                >
                                                    <DropdownToggle
                                                        className="custom-dropdown-toggle"
                                                        style={{
                                                            backgroundColor: "transparent",
                                                            color: "black",
                                                            border: "0px",
                                                        }}
                                                    >
                                                        <span>. . .</span>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem
                                                            onClick={() => handleEditModalToggle(item)}
                                                        >
                                                            Edit
                                                        </DropdownItem>

                                                        <DropdownItem onClick={() => openDeleteModal(item)}>
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                {listingdata.length == 0 && (
                                    <tr className="nobg-hover">
                                        <td colSpan="5" className="text-center">
                                            <div className="norecords">RECORD NOT FOUND</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                    <div className="mt-2"></div>
                </div>
                <ToastContainer />
            </div>

            <div>
                <Modal size="md" isOpen={addNewModal}>
                    <ModalHeader>Add New Task</ModalHeader>
                    <ModalBody className={styles.no_scroll}>
                        <form>
                            <div className="form-group mb-3">
                                <label>Task Name</label>
                                <Input
                                    type="text"
                                    value={title}
                                    placeholder="Enter Name"
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                                <h6 className="text-danger text-capitalize">{error?.addError ? "Field can't be empty" : ""}</h6>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <div className="">
                            <button
                                className="btn btn-secondary mr-3"
                                onClick={handleAddToggle}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary  ml-3" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal size="md" isOpen={editNewModal}>
                    <ModalHeader>Edit Task</ModalHeader>
                    <ModalBody className={styles.no_scroll}>
                        <form>
                            <div className="form-group">
                                <label>Task Name</label>
                                <Input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={editTask?.title}
                                    onChange={(e) => handleEditChange("title", e.target.value)}
                                />
                            </div>
                            <label className="text-danger mb-3">{error?.editError && "Field Can't be Empty"}</label>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <div className="">
                            <button
                                className="btn btn-secondary mr-3"
                                onClick={handleEditModalToggle}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary  ml-3"
                                onClick={handleUpdateTask}
                            >
                                Submit
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal size="ml" isOpen={deleteModal} toggle={() => closeDeleteModal()}>
                    <div className="modal-content">
                        <ModalHeader
                            className="header-less"
                            toggle={() => closeDeleteModal()}
                        >
                            <div>Skill</div>
                        </ModalHeader>
                        <ModalBody className="border-0 text-left">
                            Are you sure want to delete skill ?
                        </ModalBody>
                        <span className="text-danger ml-3">{deleteError}</span>

                        <ModalFooter>
                            <Button color="secondary" onClick={() => closeDeleteModal()}>
                                Cancel
                            </Button>

                            <Button
                                color="primary"
                                onClick={() => handleDelete(deleteTaskId)}
                            >
                                Delete
                            </Button>
                        </ModalFooter>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Index;

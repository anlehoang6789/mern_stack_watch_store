import {
  Panel,
  Button,
  ButtonToolbar,
  Rate,
  Notification,
  toaster,
  Form,
  Input,
} from "rsuite";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import Cookies from "js-cookie";

const Details = () => {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userComment, setUserComment] = useState(null);
  const [newComment, setNewComment] = useState({ rating: 0, content: "" });
  const { isLoggedIn, isAdmin } = useAuth();

  useEffect(() => {
    const fetchWatchById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/watches/${id}`
        );
        setWatch(response.data.watch);
        setUserComment(response.data.userComment);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch watch details:", error);
        setLoading(false);
      }
    };

    fetchWatchById();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      const token = Cookies.get("token");
      console.log("Token trong details:", token);
      const response = await axios.post(
        `http://localhost:5000/api/watches/${id}/comment`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Đảm bảo gửi token nếu cần thiết
          },
        }
      );

      setUserComment(response.data.comment);
      toaster.push(
        <Notification type="success" header="Success">
          Comment submitted successfully.
        </Notification>,
        { placement: "topEnd" }
      );
    } catch (error) {
      toaster.push(
        <Notification type="error" header="Error">
          {error.response?.data?.message || "Failed to submit comment"}
        </Notification>,
        { placement: "topEnd" }
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Panel header={watch.watchName} bordered>
        <div className="flex">
          <div className="w-[500px]">
            <img
              src={
                watch.image ||
                "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdhdGNofGVufDB8MHwwfHx8MA%3D%3D"
              }
              alt={watch.watchName}
              className="w-full rounded-lg"
            />
          </div>
          <div className="w-1/3 p-4">
            <p className="text-xl font-semibold mb-4">Brand</p>
            <ButtonToolbar vertical>
              <Button color="blue" className="mb-2">
                {watch.brand.brandName}
              </Button>
              {/* Thêm các nút thương hiệu khác ở đây */}
            </ButtonToolbar>
            <p className="mt-4 text-sm">
              Description: {watch.watchDescription}
            </p>
            <p className="mt-4 text-sm">Price: {watch.price}</p>
          </div>
        </div>
        <div className="mt-4">
          <p>Comment:</p>
          {isLoggedIn ? (
            isAdmin ? (
              <p className="text-red-500">
                You are admin so you cannot comment.
              </p>
            ) : userComment ? (
              <>
                <div className="flex items-center mt-2">
                  <div className="flex-shrink-0">
                    <Rate defaultValue={userComment.rating} readOnly />
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-semibold">
                      {userComment.author}
                    </p>
                    <p className="text-xs text-gray-500">{userComment.date}</p>
                  </div>
                </div>
                <p className="mt-2">{userComment.content}</p>
                <p className="text-red-500">
                  Tài khoản của bạn đã comment ở sản phẩm này rồi.
                </p>
              </>
            ) : (
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group controlId="rating">
                  <Form.ControlLabel>Rating</Form.ControlLabel>
                  <Rate
                    value={newComment.rating}
                    onChange={(value) =>
                      setNewComment((prev) => ({ ...prev, rating: value }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.ControlLabel>Comment</Form.ControlLabel>
                  <Input
                    as="textarea"
                    rows={3}
                    value={newComment.content}
                    onChange={(value) =>
                      setNewComment((prev) => ({ ...prev, content: value }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Button appearance="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            )
          ) : (
            <p>
              Vui lòng{" "}
              <Link to={"/login"} className="text-blue-500">
                đăng nhập
              </Link>{" "}
              để bình luận.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
};

export default Details;

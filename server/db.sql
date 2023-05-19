--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Homebrew)
-- Dumped by pg_dump version 14.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: blog_comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.blog_comments_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_comments_comment_id_seq OWNER TO tpl1122_16;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blog_comments; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.blog_comments (
    comment_id integer DEFAULT nextval('public.blog_comments_comment_id_seq'::regclass) NOT NULL,
    commenter_name text,
    comment_text text,
    comment_posted timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    post_id integer,
    user_id integer
);


ALTER TABLE public.blog_comments OWNER TO tpl1122_16;

--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.blog_posts (
    blog_id integer NOT NULL,
    title text,
    content text,
    highlight1 text,
    highlight2 text,
    author text,
    posted timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    edited text
);


ALTER TABLE public.blog_posts OWNER TO tpl1122_16;

--
-- Name: blog_posts_blog_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.blog_posts_blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_posts_blog_id_seq OWNER TO tpl1122_16;

--
-- Name: blog_posts_blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_16
--

ALTER SEQUENCE public.blog_posts_blog_id_seq OWNED BY public.blog_posts.blog_id;


--
-- Name: blog_users_blog_user_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.blog_users_blog_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_users_blog_user_id_seq OWNER TO tpl1122_16;

--
-- Name: blog_users; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.blog_users (
    blog_user_id integer DEFAULT nextval('public.blog_users_blog_user_id_seq'::regclass) NOT NULL,
    blog_username text
);


ALTER TABLE public.blog_users OWNER TO tpl1122_16;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO tpl1122_16;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.contacts (
    id integer DEFAULT nextval('public.contacts_id_seq'::regclass) NOT NULL,
    first_name text,
    last_name text,
    phone text,
    email text,
    notes text,
    CONSTRAINT chk_email CHECK ((email ~~ '%_@__%.__%'::text))
);


ALTER TABLE public.contacts OWNER TO tpl1122_16;

--
-- Name: ready_items_item_id; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.ready_items_item_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ready_items_item_id OWNER TO tpl1122_16;

--
-- Name: ready_items; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.ready_items (
    item_id integer DEFAULT nextval('public.ready_items_item_id'::regclass) NOT NULL,
    item text NOT NULL,
    item_is_done boolean DEFAULT false NOT NULL,
    list_id integer,
    item_due_date text,
    item_version integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.ready_items OWNER TO tpl1122_16;

--
-- Name: ready_lists_list_id; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.ready_lists_list_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ready_lists_list_id OWNER TO tpl1122_16;

--
-- Name: ready_lists; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.ready_lists (
    list_id integer DEFAULT nextval('public.ready_lists_list_id'::regclass) NOT NULL,
    list_name text NOT NULL,
    trip_id integer,
    user_id integer NOT NULL,
    is_template boolean DEFAULT false,
    list_created timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ready_lists OWNER TO tpl1122_16;

--
-- Name: ready_trips_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.ready_trips_trip_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ready_trips_trip_id_seq OWNER TO tpl1122_16;

--
-- Name: ready_trips; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.ready_trips (
    trip_id integer DEFAULT nextval('public.ready_trips_trip_id_seq'::regclass) NOT NULL,
    trip_name text NOT NULL,
    trip_start_date text NOT NULL,
    trip_end_date text NOT NULL,
    location text NOT NULL,
    user_id integer,
    trip_description text NOT NULL,
    trip_created timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ready_trips OWNER TO tpl1122_16;

--
-- Name: ready_users_user_id; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.ready_users_user_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ready_users_user_id OWNER TO tpl1122_16;

--
-- Name: ready_users; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.ready_users (
    user_id integer DEFAULT nextval('public.ready_users_user_id'::regclass) NOT NULL,
    user_created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_email text,
    user_first_name text,
    user_last_name text,
    user_username text,
    user_auth0_nickname text
);


ALTER TABLE public.ready_users OWNER TO tpl1122_16;

--
-- Name: readyusers_user_id; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.readyusers_user_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.readyusers_user_id OWNER TO tpl1122_16;

--
-- Name: students; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.students (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    is_current boolean
);


ALTER TABLE public.students OWNER TO tpl1122_16;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO tpl1122_16;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_16
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: trips_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.trips_trip_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trips_trip_id_seq OWNER TO tpl1122_16;

--
-- Name: weatherusers_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_16
--

CREATE SEQUENCE public.weatherusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.weatherusers_id_seq OWNER TO tpl1122_16;

--
-- Name: weatherusers; Type: TABLE; Schema: public; Owner: tpl1122_16
--

CREATE TABLE public.weatherusers (
    id integer DEFAULT nextval('public.weatherusers_id_seq'::regclass) NOT NULL,
    firstname text,
    lastname text,
    username text,
    favoritecity text
);


ALTER TABLE public.weatherusers OWNER TO tpl1122_16;

--
-- Name: blog_posts blog_id; Type: DEFAULT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.blog_posts ALTER COLUMN blog_id SET DEFAULT nextval('public.blog_posts_blog_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Data for Name: blog_comments; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (2, 'camille', 'this is a comment', '2023-04-06 14:45:17.813186', 1, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (5, 'Rando', 'Testing this', '2023-04-07 14:03:05.11133', 3, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (6, 'Rando', 'Keep up the great work', '2023-04-07 14:04:45.954479', 2, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (7, 'Rando', 'just another quick test', '2023-04-07 14:05:58.730583', 2, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (8, 'Rando', 'one more test for good measure', '2023-04-07 14:08:23.885912', 3, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (9, 'Rando', 'For console logging purposes', '2023-04-07 14:13:22.377371', 3, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (10, 'Rando', 'winner winner chicken dinner', '2023-04-07 14:15:00.956362', 3, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (11, 'Rando', 'please work', '2023-04-07 14:16:19.361266', 3, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (12, 'Rando', 'On this test blog post here is a test comment', '2023-04-07 14:17:00.692439', 7, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (13, 'Rando', 'Let me just see something', '2023-04-07 14:21:41.918496', 7, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (14, 'Rando', 'Hopefully we only get unique comments here', '2023-04-07 14:47:02.141815', 7, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (3, 'Rando', 'This is another comment', '2023-04-06 15:59:54.811976', 7, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (15, 'Rando', 'We are adding a newer comment here', '2023-04-07 15:00:24.395236', 7, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (16, NULL, 'thanks for sharing this!', '2023-04-07 16:35:16.438466', 7, 3);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (17, NULL, 'testing out if i can get number of comments', '2023-04-07 16:50:27.634761', 7, 3);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (18, NULL, 'trying this out once again', '2023-04-07 16:50:48.019259', 7, 3);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (19, NULL, 'just a test new comment', '2023-04-07 17:32:43.69635', 2, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (4, 'Rando', 'You''ve been a great aunty!!', '2023-04-07 14:01:45.927275', 3, 3);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (20, NULL, 'you''re doing truly great~', '2023-04-07 17:54:54.7135', 1, 2);
INSERT INTO public.blog_comments (comment_id, commenter_name, comment_text, comment_posted, post_id, user_id) VALUES (21, NULL, 'i hope you''re enjoying this', '2023-04-07 18:56:03.451174', 1, 4);


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.blog_posts (blog_id, title, content, highlight1, highlight2, author, posted, edited) VALUES (2, 'Progress Towards Weight Loss', 'Big mood green juice hammock live-edge sus. Copper mug raw denim slow-carb viral shoreditch, narwhal prism blackbird spyplane twee sriracha flannel shaman. Roof party freegan banh mi mukbang iceland vinyl poutine church-key try-hard activated charcoal gluten-free hot chicken. Tattooed copper mug palo santo squid hella tilde ascot solarpunk deep v meggings DSA praxis. Cornhole mustache portland, food truck grailed affogato stumptown.

Tonx readymade pop-up craft beer 90''s, dreamcatcher enamel pin banh mi you probably haven''t heard of them biodiesel offal. Cred kombucha pok pok edison bulb, hexagon tumeric pork belly small batch narwhal. Dreamcatcher taiyaki salvia scenester skateboard mlkshk chillwave. Fingerstache bicycle rights air plant next level activated charcoal before they sold out. Slow-carb marxism kombucha man braid chambray, fanny pack beard la croix pinterest flannel migas. Authentic vaporware fixie bodega boys big mood pickled yuccie freegan kale chips 3 wolf moon.', 'Woke occupy mustache before they sold out normcore neutral milk hotel umami.', NULL, 'Camille Williams', '2023-04-04 13:36:39.306888', NULL);
INSERT INTO public.blog_posts (blog_id, title, content, highlight1, highlight2, author, posted, edited) VALUES (1, 'Becoming a Software Engineer So Far', 'I''m baby authentic DIY narwhal forage, pok pok praxis bushwick meh bicycle rights swag. Readymade trust fund health goth, direct trade bruh echo park scenester chambray live-edge hexagon chillwave. Mlkshk semiotics put a bird on it chicharrones bushwick street art mustache schlitz listicle. Woke occupy mustache before they sold out normcore neutral milk hotel umami migas gorpcore plaid actually bitters chillwave wolf whatever. Health goth heirloom whatever af single-origin coffee paleo next level tote bag.

Big mood green juice hammock live-edge sus. Copper mug raw denim slow-carb viral shoreditch, narwhal prism blackbird spyplane twee sriracha flannel shaman. Roof party freegan banh mi mukbang iceland vinyl poutine church-key try-hard activated charcoal gluten-free hot chicken. Tattooed copper mug palo santo squid hella tilde ascot solarpunk deep v meggings DSA praxis. Cornhole mustache portland, food truck grailed affogato stumptown.', 'Dummy text? More like dummy thicc text, amirite?', NULL, 'Camille Williams', '2023-04-04 12:17:43.408027', NULL);
INSERT INTO public.blog_posts (blog_id, title, content, highlight1, highlight2, author, posted, edited) VALUES (3, 'Am I Being a Good Auntie to baby Sayge?', 'I''m baby neutral milk hotel iPhone lo-fi wolf, four dollar toast leggings semiotics slow-carb yes plz gentrify deep v brunch. Tousled chillwave post-ironic jianbing. JOMO hella keffiyeh irony kitsch. Cray bodega boys disrupt cred put a bird on it squid letterpress ascot. Sus copper mug everyday carry single-origin coffee salvia gatekeep.

Direct trade slow-carb ugh bodega boys banjo big mood 8-bit glossier migas freegan palo santo authentic small batch portland tilde. Green juice mlkshk hexagon, bitters ethical literally meggings air plant heirloom banh mi lyft sus brunch cred tousled. Williamsburg pork belly vice typewriter mlkshk, tonx meditation biodiesel fashion axe brunch tumeric hoodie copper mug keffiyeh mumblecore. Shoreditch forage messenger bag, health goth 8-bit synth iPhone tumeric organic jean shorts la croix deep v. Snackwave edison bulb gorpcore solarpunk VHS helvetica neutra leggings.', 'JOMO green juice marxism man braid chia skateboard poke taxidermy small batch.', NULL, 'Camille Williams-McGee', '2023-04-04 13:37:29.762206', '2023-04-05');
INSERT INTO public.blog_posts (blog_id, title, content, highlight1, highlight2, author, posted, edited) VALUES (7, 'This is a new blog post', 'Here is some fun content
we are having osmg lnbfbme', '', '', 'Joseph', '2023-04-06 13:47:10.830485', '2023-04-07');


--
-- Data for Name: blog_users; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.blog_users (blog_user_id, blog_username) VALUES (1, 'presidentcami');
INSERT INTO public.blog_users (blog_user_id, blog_username) VALUES (2, 'randomuser');
INSERT INTO public.blog_users (blog_user_id, blog_username) VALUES (3, 'mrjoeshow');
INSERT INTO public.blog_users (blog_user_id, blog_username) VALUES (4, 'ziggy');


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.contacts (id, first_name, last_name, phone, email, notes) VALUES (13, 'Alex', 'Barre Reinhart', '2154780932', 'alex.mcgee@test.com', 'friendly white guy');
INSERT INTO public.contacts (id, first_name, last_name, phone, email, notes) VALUES (16, 'Samuel', 'Coxon', '555-555-5555', 'same@sam.com', 'my mentor');
INSERT INTO public.contacts (id, first_name, last_name, phone, email, notes) VALUES (20, 'Divya', 'Chandron', '555-555-5555', 'camiwills325@gmail.com', 'My other mentor');
INSERT INTO public.contacts (id, first_name, last_name, phone, email, notes) VALUES (28, 'Chris', 'Jaure', '5616708902', 'camiwills325@gmail.com', 'cleared the form');
INSERT INTO public.contacts (id, first_name, last_name, phone, email, notes) VALUES (29, 'Anneice', 'M', '5616708902', 'camiwills325@gmail.com', 'sgafgfad');
INSERT INTO public.contacts (id, first_name, last_name, phone, email, notes) VALUES (6, 'Joseph', 'McGee', '(877)-902-0284', 'test@test.com', 'My fiancé');


--
-- Data for Name: ready_items; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (1, 'Pack suitcase', false, 1, NULL, 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (2, 'Unpack suitcase', false, 2, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (3, 'Wash clothes', false, 2, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (4, 'find a cat sitter', false, 1, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (5, 'throw out old food', false, 1, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (6, 'plan out clothes for the week', false, 2, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (7, 'pick out shoes', false, 3, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (8, 'wash my hair', false, 3, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (9, 'drink a liquid iv', false, NULL, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (10, 'take makeup off', false, NULL, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (11, 'take off makeup', false, 4, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (12, 'look for a rental car', false, 5, '', 1);
INSERT INTO public.ready_items (item_id, item, item_is_done, list_id, item_due_date, item_version) VALUES (13, 'charge phone', false, 1, '', 1);


--
-- Data for Name: ready_lists; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.ready_lists (list_id, list_name, trip_id, user_id, is_template, list_created) VALUES (1, 'Pre-Trip To-Do List', 3, 1, false, '2023-05-16 17:12:59.400888');
INSERT INTO public.ready_lists (list_id, list_name, trip_id, user_id, is_template, list_created) VALUES (2, 'Post-Trip To-Do List', 3, 1, false, '2023-05-16 17:12:59.400888');
INSERT INTO public.ready_lists (list_id, list_name, trip_id, user_id, is_template, list_created) VALUES (3, 'Pre-Trip To-Do List', 4, 1, false, '2023-05-16 17:12:59.400888');
INSERT INTO public.ready_lists (list_id, list_name, trip_id, user_id, is_template, list_created) VALUES (4, 'Post-Trip To-Do List', 4, 1, false, '2023-05-16 17:12:59.400888');
INSERT INTO public.ready_lists (list_id, list_name, trip_id, user_id, is_template, list_created) VALUES (5, 'Pre-Trip To-Do List', 5, 1, false, '2023-05-16 17:12:59.400888');
INSERT INTO public.ready_lists (list_id, list_name, trip_id, user_id, is_template, list_created) VALUES (6, 'Post-Trip To-Do List', 5, 1, false, '2023-05-16 17:12:59.400888');
INSERT INTO public.ready_lists (list_id, list_name, trip_id, user_id, is_template, list_created) VALUES (7, 'Packing List', 3, 1, false, '2023-05-19 13:30:31.28921');


--
-- Data for Name: ready_trips; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.ready_trips (trip_id, trip_name, trip_start_date, trip_end_date, location, user_id, trip_description, trip_created) VALUES (4, 'Beyonce Concert', '2023-06-30', '2023-07-01', 'D.C.', 1, 'Going to see Beyonce', '2023-05-16 17:13:35.368736');
INSERT INTO public.ready_trips (trip_id, trip_name, trip_start_date, trip_end_date, location, user_id, trip_description, trip_created) VALUES (5, 'Down the Shore', '2023-05-26', '2023-05-30', 'Corolla, North Carolina', 1, 'Test', '2023-05-16 17:13:35.368736');
INSERT INTO public.ready_trips (trip_id, trip_name, trip_start_date, trip_end_date, location, user_id, trip_description, trip_created) VALUES (3, 'Down the Shore', '2023-08-12', '2023-08-19', 'Sea Isle City', 1, 'Family vacation with my partner Joe and his parents. We go every year, stay at a house and hit up the beach.', '2023-05-16 17:13:35.368736');


--
-- Data for Name: ready_users; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (1, '2023-05-09 17:55:22.122749', 'camiwills325@gmail.com', 'Camille', 'Williams', NULL, 'camiwills325');
INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (2, '2023-05-10 15:54:12.684117', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (3, '2023-05-10 15:54:53.864948', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (4, '2023-05-10 15:55:53.569199', 'camiwills3257@gmail.com', 'Camilli', 'Williamson', NULL, 'camiwills3257');
INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (6, '2023-05-10 16:01:26.428979', 'test@tes.com', 'Camille', 'Williams', NULL, 'test');
INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (7, '2023-05-10 17:20:14.831624', 'camiwills325+testing2@gmail.com', 'McGee', 'Camille', NULL, 'camiwills325+testing2');
INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (9, '2023-05-10 17:35:51.151988', 'camiwills325+testing5@gmail.com', NULL, NULL, NULL, 'camiwills325+testing5');
INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (10, '2023-05-10 17:37:56.941549', 'camiwills325+testing1@gmail.com', NULL, NULL, NULL, 'camiwills325+testing1');
INSERT INTO public.ready_users (user_id, user_created, user_email, user_first_name, user_last_name, user_username, user_auth0_nickname) VALUES (12, '2023-05-10 17:42:00.783815', 'camiwills325+testing7@gmail.com', NULL, NULL, NULL, 'camiwills325+testing7');


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.students (id, firstname, lastname, is_current) VALUES (3, 'Ammelie', 'France', true);
INSERT INTO public.students (id, firstname, lastname, is_current) VALUES (5, 'Lisa', 'Simpson', false);
INSERT INTO public.students (id, firstname, lastname, is_current) VALUES (6, 'Cristina', 'Gomez', false);
INSERT INTO public.students (id, firstname, lastname, is_current) VALUES (1, 'Janet', 'Jackson', false);
INSERT INTO public.students (id, firstname, lastname, is_current) VALUES (8, 'Camille', 'Williams', true);
INSERT INTO public.students (id, firstname, lastname, is_current) VALUES (9, 'Maciah', 'McLaughlin', NULL);


--
-- Data for Name: weatherusers; Type: TABLE DATA; Schema: public; Owner: tpl1122_16
--

INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (5, 'Andrew', 'Taylor', 'butthead', '19121,us');
INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (4, 'Sonja', 'Hill', 'songsandtapes', '33441,us');
INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (10, 'Alex', 'Reinhart', 'squishface', '60007,us');
INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (3, 'Joseph', 'McGee', 'mr.joeshow', '60007,us');
INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (2, 'Camille', 'Williams', 'presidentcami', NULL);
INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (8, 'John', 'Humes', 'johnny', NULL);
INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (11, 'Camille', 'Williams', 'chewbacca', NULL);
INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (12, 'Cristina', 'Rodriguez', 'teacher', NULL);
INSERT INTO public.weatherusers (id, firstname, lastname, username, favoritecity) VALUES (6, 'Anjel', 'Cervantes', 'sheerjoy', '33441,us');


--
-- Name: blog_comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.blog_comments_comment_id_seq', 21, true);


--
-- Name: blog_posts_blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.blog_posts_blog_id_seq', 7, true);


--
-- Name: blog_users_blog_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.blog_users_blog_user_id_seq', 4, true);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.contacts_id_seq', 30, true);


--
-- Name: ready_items_item_id; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.ready_items_item_id', 13, true);


--
-- Name: ready_lists_list_id; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.ready_lists_list_id', 7, true);


--
-- Name: ready_trips_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.ready_trips_trip_id_seq', 5, true);


--
-- Name: ready_users_user_id; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.ready_users_user_id', 553, true);


--
-- Name: readyusers_user_id; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.readyusers_user_id', 1, false);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.students_id_seq', 9, true);


--
-- Name: trips_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.trips_trip_id_seq', 1, false);


--
-- Name: weatherusers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_16
--

SELECT pg_catalog.setval('public.weatherusers_id_seq', 12, true);


--
-- Name: blog_comments blog_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_comments_pkey PRIMARY KEY (comment_id);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (blog_id);


--
-- Name: blog_users blog_users_blog_username_key; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.blog_users
    ADD CONSTRAINT blog_users_blog_username_key UNIQUE (blog_username);


--
-- Name: blog_users blog_users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.blog_users
    ADD CONSTRAINT blog_users_pkey PRIMARY KEY (blog_user_id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: ready_items ready_items_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_items
    ADD CONSTRAINT ready_items_pkey PRIMARY KEY (item_id);


--
-- Name: ready_lists ready_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_lists
    ADD CONSTRAINT ready_lists_pkey PRIMARY KEY (list_id);


--
-- Name: ready_users ready_users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_users
    ADD CONSTRAINT ready_users_pkey PRIMARY KEY (user_id);


--
-- Name: ready_users ready_users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_users
    ADD CONSTRAINT ready_users_user_email_key UNIQUE (user_email);


--
-- Name: ready_users ready_users_user_username_key; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_users
    ADD CONSTRAINT ready_users_user_username_key UNIQUE (user_username);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: ready_trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (trip_id);


--
-- Name: weatherusers weatherusers_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.weatherusers
    ADD CONSTRAINT weatherusers_pkey PRIMARY KEY (id);


--
-- Name: weatherusers weatherusers_username_key; Type: CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.weatherusers
    ADD CONSTRAINT weatherusers_username_key UNIQUE (username);


--
-- Name: blog_comments blog_comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.blog_posts(blog_id) ON DELETE SET NULL;


--
-- Name: blog_comments blog_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.blog_users(blog_user_id);


--
-- Name: ready_items list_id; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_items
    ADD CONSTRAINT list_id FOREIGN KEY (list_id) REFERENCES public.ready_lists(list_id);


--
-- Name: ready_lists trip_id; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_lists
    ADD CONSTRAINT trip_id FOREIGN KEY (trip_id) REFERENCES public.ready_trips(trip_id);


--
-- Name: ready_trips user_id; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_trips
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.ready_users(user_id);


--
-- Name: ready_lists user_id; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_16
--

ALTER TABLE ONLY public.ready_lists
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.ready_users(user_id);


--
-- PostgreSQL database dump complete
--


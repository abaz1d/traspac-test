PGDMP     9        
            {            traspac_test    14.9    15.3 D    P           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Q           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            R           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            S           1262    49667    traspac_test    DATABASE     x   CREATE DATABASE traspac_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE traspac_test;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            T           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1255    49746    generate_nip()    FUNCTION        CREATE FUNCTION public.generate_nip() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.nama IS NOT NULL THEN
        NEW.nip := '1213056900' || nextval('nip_seq')::text;
    ELSE
        NEW.nip := NULL;
    END IF;
    RETURN NEW;
END;
$$;
 %   DROP FUNCTION public.generate_nip();
       public          postgres    false    4            �            1255    49688 
   id_agama()    FUNCTION     �   CREATE FUNCTION public.id_agama() RETURNS text
    LANGUAGE plpgsql
    AS $$
	BEGIN
		return 'AGM-0' || nextval('id_agama_seq');
	END;
$$;
 !   DROP FUNCTION public.id_agama();
       public          postgres    false    4            �            1255    49692    id_eselon()    FUNCTION     �   CREATE FUNCTION public.id_eselon() RETURNS text
    LANGUAGE plpgsql
    AS $$
	BEGIN
		return 'ESL-0' || nextval('id_eselon_seq');
	END;
$$;
 "   DROP FUNCTION public.id_eselon();
       public          postgres    false    4            �            1255    49690    id_golongan()    FUNCTION     �   CREATE FUNCTION public.id_golongan() RETURNS text
    LANGUAGE plpgsql
    AS $$
	BEGIN
		return 'GOL-0' || nextval('id_golongan_seq');
	END;
$$;
 $   DROP FUNCTION public.id_golongan();
       public          postgres    false    4            �            1255    49694    id_jabatan()    FUNCTION     �   CREATE FUNCTION public.id_jabatan() RETURNS text
    LANGUAGE plpgsql
    AS $$
	BEGIN
		return 'JBT-0' || nextval('id_jabatan_seq');
	END;
$$;
 #   DROP FUNCTION public.id_jabatan();
       public          postgres    false    4            �            1255    49736    id_pegawai()    FUNCTION     �   CREATE FUNCTION public.id_pegawai() RETURNS text
    LANGUAGE plpgsql
    AS $$
	BEGIN
		return 'PGW-0' || nextval('id_pegawai_seq');
	END;
$$;
 #   DROP FUNCTION public.id_pegawai();
       public          postgres    false    4            �            1255    49696 	   id_uker()    FUNCTION     �   CREATE FUNCTION public.id_uker() RETURNS text
    LANGUAGE plpgsql
    AS $$
	BEGIN
		return 'UK-0' || nextval('id_uker_seq');
	END;
$$;
     DROP FUNCTION public.id_uker();
       public          postgres    false    4            �            1255    49677 	   id_user()    FUNCTION     �   CREATE FUNCTION public.id_user() RETURNS text
    LANGUAGE plpgsql
    AS $$
	BEGIN
		return 'USR-0' || nextval('users_id_user_seq');
	END;
$$;
     DROP FUNCTION public.id_user();
       public          postgres    false    4            �            1259    49699    agama    TABLE     �   CREATE TABLE public.agama (
    id_agama character varying(50) DEFAULT public.id_agama() NOT NULL,
    nama_agama character varying NOT NULL
);
    DROP TABLE public.agama;
       public         heap    postgres    false    225    4            �            1259    49727    eselon    TABLE     �   CREATE TABLE public.eselon (
    id_eselon character varying(50) DEFAULT public.id_eselon() NOT NULL,
    nama_eselon character varying(10) NOT NULL,
    keterangan_eselon character varying
);
    DROP TABLE public.eselon;
       public         heap    postgres    false    228    4            �            1259    49721    golongan    TABLE     �   CREATE TABLE public.golongan (
    id_golongan character varying(50) DEFAULT public.id_golongan() NOT NULL,
    nama_golongan character varying(50) NOT NULL
);
    DROP TABLE public.golongan;
       public         heap    postgres    false    226    4            �            1259    49687    id_agama_seq    SEQUENCE     u   CREATE SEQUENCE public.id_agama_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.id_agama_seq;
       public          postgres    false    4            �            1259    49691    id_eselon_seq    SEQUENCE     v   CREATE SEQUENCE public.id_eselon_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.id_eselon_seq;
       public          postgres    false    4            �            1259    49689    id_golongan_seq    SEQUENCE     x   CREATE SEQUENCE public.id_golongan_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.id_golongan_seq;
       public          postgres    false    4            �            1259    49693    id_jabatan_seq    SEQUENCE     w   CREATE SEQUENCE public.id_jabatan_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.id_jabatan_seq;
       public          postgres    false    4            �            1259    49735    id_pegawai_seq    SEQUENCE     w   CREATE SEQUENCE public.id_pegawai_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.id_pegawai_seq;
       public          postgres    false    4            �            1259    49695    id_uker_seq    SEQUENCE     t   CREATE SEQUENCE public.id_uker_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.id_uker_seq;
       public          postgres    false    4            �            1259    49713    jabatan    TABLE     �   CREATE TABLE public.jabatan (
    id_jabatan character varying(50) DEFAULT public.id_jabatan() NOT NULL,
    nama_jabatan character varying NOT NULL
);
    DROP TABLE public.jabatan;
       public         heap    postgres    false    229    4            �            1259    49737    nip_seq    SEQUENCE     p   CREATE SEQUENCE public.nip_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE public.nip_seq;
       public          postgres    false    4            �            1259    49748    pegawai    TABLE       CREATE TABLE public.pegawai (
    id_pegawai character varying DEFAULT public.id_pegawai() NOT NULL,
    nip character varying,
    nama character varying,
    tempat_lahir character varying,
    tanggal_lahir date,
    jenis_kelamin character(1),
    golongan character varying,
    eselon character varying,
    jabatan character varying,
    tempat_tugas character varying,
    agama character varying,
    unit_kerja character varying,
    alamat text,
    no_hp character varying,
    npwp character varying,
    foto_profil bytea
);
    DROP TABLE public.pegawai;
       public         heap    postgres    false    230    4            �            1259    49707 
   unit_kerja    TABLE     �   CREATE TABLE public.unit_kerja (
    id_uker character varying(50) DEFAULT public.id_uker() NOT NULL,
    kategori character varying(100) NOT NULL,
    nama_unit character varying(100) NOT NULL
);
    DROP TABLE public.unit_kerja;
       public         heap    postgres    false    227    4            �            1259    49678    users    TABLE     �   CREATE TABLE public.users (
    id_user character varying DEFAULT public.id_user() NOT NULL,
    email_user character varying(100) NOT NULL,
    username character varying(50),
    password text NOT NULL,
    token text
);
    DROP TABLE public.users;
       public         heap    postgres    false    224    4            �            1259    49686    users_id_user_seq    SEQUENCE     z   CREATE SEQUENCE public.users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_id_user_seq;
       public          postgres    false    4            F          0    49699    agama 
   TABLE DATA           5   COPY public.agama (id_agama, nama_agama) FROM stdin;
    public          postgres    false    216   �L       J          0    49727    eselon 
   TABLE DATA           K   COPY public.eselon (id_eselon, nama_eselon, keterangan_eselon) FROM stdin;
    public          postgres    false    220   /M       I          0    49721    golongan 
   TABLE DATA           >   COPY public.golongan (id_golongan, nama_golongan) FROM stdin;
    public          postgres    false    219   3N       H          0    49713    jabatan 
   TABLE DATA           ;   COPY public.jabatan (id_jabatan, nama_jabatan) FROM stdin;
    public          postgres    false    218   �N       M          0    49748    pegawai 
   TABLE DATA           �   COPY public.pegawai (id_pegawai, nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, golongan, eselon, jabatan, tempat_tugas, agama, unit_kerja, alamat, no_hp, npwp, foto_profil) FROM stdin;
    public          postgres    false    223   �O       G          0    49707 
   unit_kerja 
   TABLE DATA           B   COPY public.unit_kerja (id_uker, kategori, nama_unit) FROM stdin;
    public          postgres    false    217   �P       ?          0    49678    users 
   TABLE DATA           O   COPY public.users (id_user, email_user, username, password, token) FROM stdin;
    public          postgres    false    209   [R       U           0    0    id_agama_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.id_agama_seq', 6, true);
          public          postgres    false    211            V           0    0    id_eselon_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.id_eselon_seq', 19, true);
          public          postgres    false    213            W           0    0    id_golongan_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.id_golongan_seq', 20, true);
          public          postgres    false    212            X           0    0    id_jabatan_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.id_jabatan_seq', 14, true);
          public          postgres    false    214            Y           0    0    id_pegawai_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.id_pegawai_seq', 39, true);
          public          postgres    false    221            Z           0    0    id_uker_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.id_uker_seq', 16, true);
          public          postgres    false    215            [           0    0    nip_seq    SEQUENCE SET     6   SELECT pg_catalog.setval('public.nip_seq', 43, true);
          public          postgres    false    222            \           0    0    users_id_user_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_id_user_seq', 21, true);
          public          postgres    false    210            �           2606    49706    agama agama_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.agama
    ADD CONSTRAINT agama_pkey PRIMARY KEY (id_agama);
 :   ALTER TABLE ONLY public.agama DROP CONSTRAINT agama_pkey;
       public            postgres    false    216            �           2606    49734    eselon eselon_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.eselon
    ADD CONSTRAINT eselon_pkey PRIMARY KEY (id_eselon);
 <   ALTER TABLE ONLY public.eselon DROP CONSTRAINT eselon_pkey;
       public            postgres    false    220            �           2606    49726    golongan golongan_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.golongan
    ADD CONSTRAINT golongan_pkey PRIMARY KEY (id_golongan);
 @   ALTER TABLE ONLY public.golongan DROP CONSTRAINT golongan_pkey;
       public            postgres    false    219            �           2606    49720    jabatan jabatan_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.jabatan
    ADD CONSTRAINT jabatan_pkey PRIMARY KEY (id_jabatan);
 >   ALTER TABLE ONLY public.jabatan DROP CONSTRAINT jabatan_pkey;
       public            postgres    false    218            �           2606    49755    pegawai pegawai_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT pegawai_pkey PRIMARY KEY (id_pegawai);
 >   ALTER TABLE ONLY public.pegawai DROP CONSTRAINT pegawai_pkey;
       public            postgres    false    223            �           2606    49712    unit_kerja unit_kerja_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.unit_kerja
    ADD CONSTRAINT unit_kerja_pkey PRIMARY KEY (id_uker);
 D   ALTER TABLE ONLY public.unit_kerja DROP CONSTRAINT unit_kerja_pkey;
       public            postgres    false    217            �           2606    49685    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    209            �           1259    49788    idx_agama_id_agama    INDEX     H   CREATE INDEX idx_agama_id_agama ON public.agama USING btree (id_agama);
 &   DROP INDEX public.idx_agama_id_agama;
       public            postgres    false    216            �           1259    49789    idx_eselon_id_eselon    INDEX     L   CREATE INDEX idx_eselon_id_eselon ON public.eselon USING btree (id_eselon);
 (   DROP INDEX public.idx_eselon_id_eselon;
       public            postgres    false    220            �           1259    49790    idx_golongan_id_golongan    INDEX     T   CREATE INDEX idx_golongan_id_golongan ON public.golongan USING btree (id_golongan);
 ,   DROP INDEX public.idx_golongan_id_golongan;
       public            postgres    false    219            �           1259    49791    idx_jabatan_id_jabatan    INDEX     P   CREATE INDEX idx_jabatan_id_jabatan ON public.jabatan USING btree (id_jabatan);
 *   DROP INDEX public.idx_jabatan_id_jabatan;
       public            postgres    false    218            �           1259    49783    idx_pegawai_agama    INDEX     F   CREATE INDEX idx_pegawai_agama ON public.pegawai USING btree (agama);
 %   DROP INDEX public.idx_pegawai_agama;
       public            postgres    false    223            �           1259    49784    idx_pegawai_eselon    INDEX     H   CREATE INDEX idx_pegawai_eselon ON public.pegawai USING btree (eselon);
 &   DROP INDEX public.idx_pegawai_eselon;
       public            postgres    false    223            �           1259    49785    idx_pegawai_golongan    INDEX     L   CREATE INDEX idx_pegawai_golongan ON public.pegawai USING btree (golongan);
 (   DROP INDEX public.idx_pegawai_golongan;
       public            postgres    false    223            �           1259    49782    idx_pegawai_id_pegawai    INDEX     P   CREATE INDEX idx_pegawai_id_pegawai ON public.pegawai USING btree (id_pegawai);
 *   DROP INDEX public.idx_pegawai_id_pegawai;
       public            postgres    false    223            �           1259    49786    idx_pegawai_jabatan    INDEX     J   CREATE INDEX idx_pegawai_jabatan ON public.pegawai USING btree (jabatan);
 '   DROP INDEX public.idx_pegawai_jabatan;
       public            postgres    false    223            �           1259    49787    idx_pegawai_unit_kerja    INDEX     P   CREATE INDEX idx_pegawai_unit_kerja ON public.pegawai USING btree (unit_kerja);
 *   DROP INDEX public.idx_pegawai_unit_kerja;
       public            postgres    false    223            �           1259    49792    idx_unit_kerja_id_uker    INDEX     P   CREATE INDEX idx_unit_kerja_id_uker ON public.unit_kerja USING btree (id_uker);
 *   DROP INDEX public.idx_unit_kerja_id_uker;
       public            postgres    false    217            �           2620    49756    pegawai trigger_generate_nip    TRIGGER     y   CREATE TRIGGER trigger_generate_nip BEFORE INSERT ON public.pegawai FOR EACH ROW EXECUTE FUNCTION public.generate_nip();
 5   DROP TRIGGER trigger_generate_nip ON public.pegawai;
       public          postgres    false    231    223            �           2606    49757    pegawai agama_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT agama_fk FOREIGN KEY (agama) REFERENCES public.agama(id_agama) ON DELETE SET NULL NOT VALID;
 :   ALTER TABLE ONLY public.pegawai DROP CONSTRAINT agama_fk;
       public          postgres    false    3480    216    223            �           2606    49762    pegawai eselon_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT eselon_fk FOREIGN KEY (eselon) REFERENCES public.eselon(id_eselon) ON DELETE SET NULL NOT VALID;
 ;   ALTER TABLE ONLY public.pegawai DROP CONSTRAINT eselon_fk;
       public          postgres    false    223    220    3492            �           2606    49767    pegawai golongan_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT golongan_fk FOREIGN KEY (golongan) REFERENCES public.golongan(id_golongan) ON DELETE SET NULL NOT VALID;
 =   ALTER TABLE ONLY public.pegawai DROP CONSTRAINT golongan_fk;
       public          postgres    false    219    223    3489            �           2606    49772    pegawai jabatan_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT jabatan_fk FOREIGN KEY (jabatan) REFERENCES public.jabatan(id_jabatan) ON DELETE SET NULL NOT VALID;
 <   ALTER TABLE ONLY public.pegawai DROP CONSTRAINT jabatan_fk;
       public          postgres    false    3487    218    223            �           2606    49777    pegawai unit_kerja_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT unit_kerja_fk FOREIGN KEY (unit_kerja) REFERENCES public.unit_kerja(id_uker) ON DELETE SET NULL NOT VALID;
 ?   ALTER TABLE ONLY public.pegawai DROP CONSTRAINT unit_kerja_fk;
       public          postgres    false    3484    223    217            F   O   x�st��50��,�I��rq�8��2�KR� \cN�Ē���lׄ�#3/��1�t*MI�H���8����3J�K�b���� y��      J   �   x�u��N�0E��W����n]�)���:2&ŉ&��	v*���9����BgE����\~�R@��A�ˀ���^���p�Fv�6f��YQd56��z�����`7�-|�a�]��Q�p�6Ŏ�@w	��8�}�K��R�z!b�d󇪨�v������3t���ʖ�Q����غ)�^���I�z���6�ͬ�K,9�[:.m�^9��i�.Q�$W���O���6���2��      I   t   x�E�9�0��/@�DHHtT4���:t3Ŏ������W�V���	>{��qp˷�6�����6e�1���A�ܪY�;���JE~ؿ�)�	R3�
�C5�e�8X      H     x�m��N�0E��W�4P�嵤�$T�(-62�L'rl��=㺆H���g�o�~M�"ʩ�aGGM�D{�-ƙ{_D��V�3��F9YT5*,���_4v
j��DA�װ�6r�>�`	ՙ��n��?X���~�0sn��<uꮥ�G.�����J�9��=�֧�7Y�(�j����-r�A��~v�%�\͜�'N����]�ȁ�6y�b.L:	ᖥF��4M�=��g׭�.��ePfX��jR��z����*��o^�       M     x�]�QO�0��˯�?�b��㈆�ɶė��ZWZӭ���
n��IoN��s���8G�v>4�RL'�*�7����u��d�u�8�O]o��_���{�	�__�hDc����U�v\VJ�[1p�
�>�Q�;7܁Y�`���#�w>�w?rs����V��2x\��d�m�tِ1L2�����0���ޥ�<����;�utť�-v6#��%����ݼ{�����͞���;��
��P�v��~�6qa?V'l�      G   X  x���?O�0���Sxl�������@�6� �X.��8�ʎ�~{�Ġ�� �����ݓ�t6O�J��#�+h���R�Vi����@q���/�4�v�=����*Q�:��16E�篶�1�E��6��k������6?��--�`�a>�uǲ'Q�K�x�r���Z�~jA��3�����;e2���ZW_I�3{��,C�����/��u[E[�|:�I�QHQ�l�c6������:�.�W7rB)Z�
�ZW������������"ǚ�T\��7uM`St�כ�]�~��P���R��k�I���͟z�xQR�8��[�D]OJj1�_��8� -�91      ?   �   x�%�]o�0 ��k���P�ʸ�T>ZV�e�BK3[��K��O��7�9,�V64����ժ�[ʰnA�ړ#�!�D�v�H��3�{�yX�>K�r*��Sn� `ϕ�ot4�^x$�AQ�fSE�I�!�ɚ\�����S���i���'�j�i�����ems���F�;��U����9��9�����@q��G��۔��$���M�SޯP�ǃB�K���L��O^     